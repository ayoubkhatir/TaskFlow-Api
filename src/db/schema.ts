import { sql } from "drizzle-orm";
import { integer, pgEnum, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const priorityEnum = pgEnum("priority", ["low", "medium", "high"]);
export const statusEnum = pgEnum("status", ["all", "pending", "in-progress", "completed"]);
export const categoryEnum = pgEnum("category", ["work", "personal", "other"]);

export const usersTable = pgTable("users", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar({ length: 30 }).notNull(),
    age: integer().default(10),
    email: varchar({ length: 255 }).notNull().unique(),
    password: varchar({ length: 60 }).notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().notNull()
});

export const tasksTable = pgTable("tasks", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("userId").references(() => usersTable.id),
    title: varchar({ length: 100 }).notNull(),
    description: varchar({ length: 255 }).notNull(),
    priority: priorityEnum().notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    status: statusEnum().default("all").notNull(),
    dueDate: timestamp("dueDate", { mode: "string" }).notNull(),
    category: categoryEnum().default("other").notNull()
});

export const sessionsTable = pgTable("sessions", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("userId").references(() => usersTable.id),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    expiresAt: timestamp("expiresAt").default(sql`NOW() + INTERVAL '30 days'`).notNull()
})