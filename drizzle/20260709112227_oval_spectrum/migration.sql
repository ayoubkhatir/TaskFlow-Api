CREATE TYPE "priority" AS ENUM('low', 'medium', 'high');--> statement-breakpoint
CREATE TABLE "tasks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"userId" uuid NOT NULL,
	"content" varchar(255),
	"title" varchar(100) NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"priority" "priority" NOT NULL
);
--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "age" SET DEFAULT 10;