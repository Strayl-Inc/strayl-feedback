import { createServerFn } from '@tanstack/react-start'
import { db } from '../db'
import { submissions } from '../db/schema'

type RewardStatus =
  | 'granted'
  | 'already_granted'
  | 'user_not_found'
  | 'invalid_email'
  | 'reward_error'

type SubmitData = {
  answers: Record<string, unknown>
  language: string
  userAgent: string
  source?: string
  returnTo?: string
}

type SubmitResult = {
  success: boolean
  submissionId?: string
  returnTo: string
  reward: {
    status: RewardStatus
    awardedCredits: number
  }
}

const DEFAULT_APP_URL = 'https://app.strayl.dev'
const FEEDBACK_REWARD_APP_URL = 'https://app.strayl.dev'
const INTERNAL_SOURCE = 'strayl-feedback'

function normalizeEmail(value: unknown): string {
  if (typeof value !== 'string') return ''
  return value.trim().toLowerCase()
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function getFallbackReturnTo(): string {
  const appUrl = process.env.STRAYL_APP_URL?.trim() || DEFAULT_APP_URL
  try {
    return new URL('/dashboard', appUrl).toString()
  } catch {
    return `${DEFAULT_APP_URL}/dashboard`
  }
}

function getAllowedOrigins(): Set<string> {
  const allowed = new Set<string>()

  const raw = process.env.FEEDBACK_ALLOWED_RETURN_ORIGINS
  if (raw) {
    for (const part of raw.split(',')) {
      const origin = part.trim()
      if (!origin) continue
      try {
        allowed.add(new URL(origin).origin)
      } catch {
        // ignore invalid origin values in env
      }
    }
  }

  const appUrl = process.env.STRAYL_APP_URL?.trim()
  if (appUrl) {
    try {
      allowed.add(new URL(appUrl).origin)
    } catch {
      // ignore
    }
  }

  try {
    allowed.add(new URL(DEFAULT_APP_URL).origin)
  } catch {
    // ignore
  }

  return allowed
}

function sanitizeReturnTo(value: string | undefined): string | null {
  if (!value) return null
  const allowedOrigins = getAllowedOrigins()

  try {
    const target = new URL(value)
    if (allowedOrigins.has(target.origin)) {
      return target.toString()
    }
  } catch {
    return null
  }

  return null
}

async function requestFeedbackReward(input: {
  email: string
  submissionId?: string
}): Promise<{ status: RewardStatus; awardedCredits: number }> {
  const secret = process.env.FEEDBACK_REWARD_SECRET?.trim()

  if (!secret) {
    console.error('[feedback-reward] Missing FEEDBACK_REWARD_SECRET')
    return { status: 'reward_error', awardedCredits: 0 }
  }

  const endpoint = `${FEEDBACK_REWARD_APP_URL}/api/internal/feedback-reward`

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-feedback-reward-secret': secret,
      },
      body: JSON.stringify({
        email: input.email,
        source: INTERNAL_SOURCE,
        submissionId: input.submissionId,
      }),
    })

    if (!response.ok) {
      console.error('[feedback-reward] Reward endpoint failed', {
        endpoint,
        status: response.status,
      })
      return { status: 'reward_error', awardedCredits: 0 }
    }

    const data = (await response.json()) as {
      status?: RewardStatus
      awardedCredits?: number
    }

    const status = data.status
    const allowedStatuses: RewardStatus[] = [
      'granted',
      'already_granted',
      'user_not_found',
      'invalid_email',
    ]

    if (!status || !allowedStatuses.includes(status)) {
      return { status: 'reward_error', awardedCredits: 0 }
    }

    return {
      status,
      awardedCredits:
        status === 'granted' && typeof data.awardedCredits === 'number'
          ? data.awardedCredits
          : 0,
    }
  } catch (error) {
    console.error('[feedback-reward] Request failed', {
      endpoint,
      error: error instanceof Error ? error.message : String(error),
    })
    return { status: 'reward_error', awardedCredits: 0 }
  }
}

export const submitFeedback = createServerFn({ method: 'POST' })
  .inputValidator((input: SubmitData) => {
    if (!input.answers || typeof input.answers !== 'object') {
      throw new Error('Invalid answers')
    }
    return input
  })
  .handler(async ({ data }): Promise<SubmitResult> => {
    const [inserted] = await db.insert(submissions).values({
      answers: data.answers,
      language: data.language,
      userAgent: data.userAgent,
    }).returning({ id: submissions.id })

    const submissionId = inserted?.id ? String(inserted.id) : undefined
    const normalizedEmail = normalizeEmail(data.answers.email)

    const reward = isValidEmail(normalizedEmail)
      ? await requestFeedbackReward({
          email: normalizedEmail,
          submissionId,
        })
      : {
          status: 'invalid_email' as const,
          awardedCredits: 0,
        }

    return {
      success: true,
      submissionId,
      returnTo: sanitizeReturnTo(data.returnTo) ?? getFallbackReturnTo(),
      reward,
    }
  })
