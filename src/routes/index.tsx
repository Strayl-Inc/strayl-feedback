import { createFileRoute } from '@tanstack/react-router'
import { FeedbackForm } from '../components/feedback/FeedbackForm'

export const Route = createFileRoute('/')({ component: FeedbackPage })

function FeedbackPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="px-4 py-8">
        <FeedbackForm />
      </main>
    </div>
  )
}
