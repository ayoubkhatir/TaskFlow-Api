import { usersTable } from "../db/schema"

export type User = typeof usersTable.$inferSelect
export type NewUser = typeof usersTable.$inferInsert
