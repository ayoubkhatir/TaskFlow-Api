ALTER TABLE "tasks" DROP COLUMN "status";--> statement-breakpoint
ALTER TABLE "tasks" ALTER COLUMN "category" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "tasks" ALTER COLUMN "category" SET DATA TYPE varchar(100) USING "category"::varchar(100);--> statement-breakpoint
ALTER TABLE "tasks" ALTER COLUMN "category" SET DEFAULT 'other';