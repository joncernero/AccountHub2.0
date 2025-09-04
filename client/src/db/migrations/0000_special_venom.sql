CREATE TABLE "accounts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" varchar NOT NULL,
	"accountName" varchar NOT NULL,
	"accountNumber" integer NOT NULL,
	"accountType" varchar NOT NULL,
	"customerNumber" integer,
	"cm" varchar NOT NULL,
	"ppcSales" varchar NOT NULL,
	"coreSales" varchar,
	"assignmentDate" date,
	"segment" varchar NOT NULL,
	"xCode" varchar,
	"agency" varchar,
	"closeDate" date,
	"closeNote" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "accounts_accountName_unique" UNIQUE("accountName"),
	CONSTRAINT "accounts_accountNumber_unique" UNIQUE("accountNumber")
);
--> statement-breakpoint
CREATE TABLE "activities" (
	"id" serial PRIMARY KEY NOT NULL,
	"accountId" uuid NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"startTime" timestamp NOT NULL,
	"endTime" timestamp,
	"isrecurring" boolean DEFAULT false,
	"recurrenceRule" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "budgets" (
	"budgetId" serial PRIMARY KEY NOT NULL,
	"orderId" integer NOT NULL,
	"startDate" date,
	"endDate" date,
	"budgetAmount" integer,
	"spendAsOf" date,
	"spendAmount" integer,
	"rollOver" integer,
	"projection" integer,
	"credits" integer,
	"buPercentage" integer,
	"dailyPacing" integer,
	"actualPacing" integer,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "implementation" (
	"implementationId" serial PRIMARY KEY NOT NULL,
	"providerId" integer NOT NULL,
	"mobileOptimized" boolean,
	"jobSource" varchar,
	"distributor" varchar,
	"jobsURL" varchar,
	"sourceTag" varchar,
	"ats" varchar,
	"bidOptimizer" boolean,
	"integratedApply" boolean,
	"emailApply" boolean,
	"military" boolean,
	"ejb" boolean,
	"guid" varchar,
	"eligibleForFree" boolean,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "orders" (
	"orderId" serial PRIMARY KEY NOT NULL,
	"accountId" uuid NOT NULL,
	"orderNumber" varchar,
	"billingPartner" varchar,
	"startDate" date,
	"endDate" date,
	"orderAmount" integer,
	"spendAsOf" date,
	"spend" integer,
	"remaining" integer,
	"orderType" varchar,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "providers" (
	"pId" serial PRIMARY KEY NOT NULL,
	"accountId" uuid NOT NULL,
	"providerName" varchar NOT NULL,
	"providerId" integer,
	"providerCode" varchar,
	"health" varchar,
	"status" varchar,
	"campaignMethod" varchar,
	"isAtRiskAtOnset" boolean NOT NULL,
	"atRiskReason" varchar,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"userId" varchar(255) PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"username" varchar NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
--> statement-breakpoint
CREATE TABLE "weeklyUpdate" (
	"updateId" serial PRIMARY KEY NOT NULL,
	"accountId" uuid NOT NULL,
	"note" text NOT NULL,
	"date" date NOT NULL,
	"jobCount" integer,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_userId_users_userId_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("userId") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "activities" ADD CONSTRAINT "activities_accountId_accounts_id_fk" FOREIGN KEY ("accountId") REFERENCES "public"."accounts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "budgets" ADD CONSTRAINT "budgets_orderId_orders_orderId_fk" FOREIGN KEY ("orderId") REFERENCES "public"."orders"("orderId") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "implementation" ADD CONSTRAINT "implementation_providerId_providers_pId_fk" FOREIGN KEY ("providerId") REFERENCES "public"."providers"("pId") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_accountId_accounts_id_fk" FOREIGN KEY ("accountId") REFERENCES "public"."accounts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "providers" ADD CONSTRAINT "providers_accountId_accounts_id_fk" FOREIGN KEY ("accountId") REFERENCES "public"."accounts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "weeklyUpdate" ADD CONSTRAINT "weeklyUpdate_accountId_accounts_id_fk" FOREIGN KEY ("accountId") REFERENCES "public"."accounts"("id") ON DELETE no action ON UPDATE no action;