import { integer, pgEnum, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const priorityEnum = pgEnum("priority", ["low", "medium", "high"]);

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
    userId: uuid("userId").notNull(),
    content: varchar({ length: 255 }),
    title: varchar({ length: 100 }).notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    priority: priorityEnum().notNull(),
});

