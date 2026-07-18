ALTER TABLE "tasks" ALTER COLUMN "status" SET DEFAULT 'all'::"status";--> statement-breakpoint
ALTER TABLE "tasks" ALTER COLUMN "status" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "tasks" ALTER COLUMN "category" SET DEFAULT 'other'::"category";--> statement-breakpoint
ALTER TABLE "tasks" ALTER COLUMN "category" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_userId_users_id_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id");