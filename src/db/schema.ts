import { pgTable, serial, jsonb, varchar, text, timestamp } from 'drizzle-orm/pg-core'

export const submissions = pgTable('submissions', {
  id: serial('id').primaryKey(),
  answers: jsonb('answers').notNull(),
  language: varchar('language', { length: 5 }),
  userAgent: text('user_agent'),
  createdAt: timestamp('created_at').defaultNow(),
})
