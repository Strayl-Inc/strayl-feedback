import { createServerFn } from '@tanstack/react-start'
import { db } from '../db'
import { submissions } from '../db/schema'

type SubmitData = {
  answers: Record<string, unknown>
  language: string
  userAgent: string
}

export const submitFeedback = createServerFn({ method: 'POST' })
  .inputValidator((input: SubmitData) => {
    if (!input.answers || typeof input.answers !== 'object') {
      throw new Error('Invalid answers')
    }
    return input
  })
  .handler(async ({ data }) => {
    await db.insert(submissions).values({
      answers: data.answers,
      language: data.language,
      userAgent: data.userAgent,
    })

    return { success: true }
  })
