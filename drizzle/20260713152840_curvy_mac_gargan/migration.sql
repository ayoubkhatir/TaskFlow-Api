CREATE TABLE "sessions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"userId" uuid,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"expiresAt" timestamp DEFAULT NOW() + INTERVAL '30 days' NOT NULL
);
--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_userId_users_id_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id");