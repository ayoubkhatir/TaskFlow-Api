ALTER TABLE "tasks" ALTER COLUMN "userId" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "tasks" ALTER COLUMN "description" SET NOT NULL;