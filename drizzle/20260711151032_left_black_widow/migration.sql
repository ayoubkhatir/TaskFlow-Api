CREATE TYPE "category" AS ENUM('work', 'personal', 'other');--> statement-breakpoint
CREATE TYPE "status" AS ENUM('all', 'pending', 'in-progress', 'completed');--> statement-breakpoint
ALTER TABLE "tasks" RENAME COLUMN "content" TO "description";--> statement-breakpoint
ALTER TABLE "tasks" ADD COLUMN "status" "status";--> statement-breakpoint
ALTER TABLE "tasks" ADD COLUMN "dueDate" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "tasks" ADD COLUMN "category" "category";