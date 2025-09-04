import {
  pgTable,
  uuid,
  serial,
  varchar,
  boolean,
  timestamp,
  integer,
  bigint,
  text,
  date,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const users = pgTable('users', {
  userId: varchar('userId', { length: 255 }).primaryKey(), // Matches Kinde's User ID
  email: varchar('email', { length: 255 }).unique().notNull(),
  username: varchar('username').notNull().unique(),
  created_at: timestamp('created_at').defaultNow(),
});

export const accounts = pgTable('accounts', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: varchar('userId')
    .notNull()
    .references(() => users.userId),
  accountName: varchar('accountName').notNull().unique(),
  accountNumber: integer('accountNumber').notNull().unique(),
  accountType: varchar('accountType').notNull(),
  customerNumber: integer('customerNumber'),
  cm: varchar('cm').notNull(),
  ppcSales: varchar('ppcSales').notNull(),
  coreSales: varchar('coreSales'),
  assignmentDate: date('assignmentDate'),
  segment: varchar('segment').notNull(),
  xCode: varchar('xCode'),
  agency: varchar('agency'),
  churnDate: date('closeDate'),
  closeNote: text('closeNote'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt')
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const providers = pgTable('providers', {
  pId: serial('pId').primaryKey(),
  accountId: uuid('accountId')
    .notNull()
    .references(() => accounts.id),
  providerName: varchar('providerName').notNull(),
  providerId: integer('providerId'),
  providerCode: varchar('providerCode'),
  health: varchar('health'),
  status: varchar('status'),
  campaignMethod: varchar('campaignMethod'),
  isAtRiskAtOnset: boolean('isAtRiskAtOnset').notNull(),
  atRiskReason: varchar('atRiskReason'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt')
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const weeklyUpdate = pgTable('weeklyUpdate', {
  updateId: serial('updateId').primaryKey(),
  accountId: uuid('accountId')
    .notNull()
    .references(() => accounts.id),
  updateNote: text('note').notNull(),
  date: date('date').notNull(),
  jobCount: integer('jobCount'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt')
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const activities = pgTable('activities', {
  id: serial('id').primaryKey(),
  accountId: uuid('accountId')
    .notNull()
    .references(() => accounts.id),
  title: text('title').notNull(),
  description: text('description'),
  startTime: timestamp('startTime').notNull(),
  endTime: timestamp('endTime'), // Optional for open-ended activities
  isRecurring: boolean('isrecurring').default(false),
  recurrenceRule: text('recurrenceRule'), // Stores RRULE string (RFC 5545 format)
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt')
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const orders = pgTable('orders', {
  orderId: serial('orderId').primaryKey(),
  accountId: uuid('accountId')
    .notNull()
    .references(() => accounts.id),
  orderNumber: varchar('orderNumber'),
  billingPartner: varchar('billingPartner'),
  startDate: date('startDate'),
  endDate: date('endDate'),
  orderAmount: integer('orderAmount'),
  spendAsOf: date('spendAsOf'),
  spend: integer('spend'),
  remaining: integer('remaining'),
  orderType: varchar('orderType'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt')
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const budgets = pgTable('budgets', {
  budgetId: serial('budgetId').primaryKey(),
  orderId: integer('orderId')
    .notNull()
    .references(() => orders.orderId),
  startDate: date('startDate'),
  endDate: date('endDate'),
  budgetAmount: integer('budgetAmount'),
  spendAsOf: date('spendAsOf'),
  spendAmount: integer('spendAmount'),
  rollOver: integer('rollOver'),
  projection: integer('projection'),
  credits: integer('credits'),
  buPercentage: integer('buPercentage'),
  dailyPacing: integer('dailyPacing'),
  actualPacing: integer('actualPacing'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt')
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const implementations = pgTable('implementation', {
  implementationId: serial('implementationId').primaryKey(),
  providerId: integer('providerId')
    .notNull()
    .references(() => providers.pId),
  isMobileOptimized: boolean('mobileOptimized'),
  jobSource: varchar('jobSource'),
  distributor: varchar('distributor'),
  jobsURL: varchar('jobsURL'),
  sourceTag: varchar('sourceTag'),
  ats: varchar('ats'),
  isBidOptimizer: boolean('bidOptimizer'),
  isIntegratedApply: boolean('integratedApply'),
  isEmailApply: boolean('emailApply'),
  isMilitary: boolean('military'),
  isEjb: boolean('ejb'),
  guid: varchar('guid'),
  isEligibleForFree: boolean('eligibleForFree'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt')
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const userRelations = relations(users, ({ many }) => ({
  account: many(accounts),
}));

export const accountRelations = relations(accounts, ({ one, many }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.userId],
  }),
  providers: many(providers),
  weeklyUpdate: many(weeklyUpdate),
  activities: many(activities),
  order: many(orders),
}));

export const providerRelations = relations(providers, ({ one, many }) => ({
  account: one(accounts, {
    fields: [providers.accountId],
    references: [accounts.id],
  }),
  implementation: many(implementations),
}));

export const weeklyUpdateRelations = relations(weeklyUpdate, ({ one }) => ({
  account: one(accounts, {
    fields: [weeklyUpdate.accountId],
    references: [accounts.id],
  }),
}));

export const activityRelations = relations(activities, ({ one }) => ({
  account: one(accounts, {
    fields: [activities.accountId],
    references: [accounts.id],
  }),
}));

export const orderRelations = relations(orders, ({ one, many }) => ({
  account: one(accounts, {
    fields: [orders.accountId],
    references: [accounts.id],
  }),
  budget: many(budgets),
}));

export const implementationRelations = relations(
  implementations,
  ({ one }) => ({
    provider: one(providers, {
      fields: [implementations.providerId],
      references: [providers.pId],
    }),
  })
);
