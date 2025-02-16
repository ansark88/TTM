
import { pgTable, serial, uuid, varchar, timestamp, text, integer } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// supabaseのauth.usersと紐づける
export const Members = pgTable("members", {
    id: serial('id').primaryKey(),
    user_id: uuid('user_id').notNull().unique(),
    name: varchar("name", { length: 50 }).notNull(), // @hogehoge のほう
    screen_name: varchar("screen_name", { length: 255 }), // 自由に変更できるほう
    bio: varchar("bio", { length: 255 }),
    icon_url: varchar("icon_url", { length: 2047 }),
    created_at: timestamp("created_at").notNull().defaultNow(),
    updated_at: timestamp("updated_at").notNull().defaultNow(),
});

export const Posts = pgTable("posts", {
    id: serial('id').primaryKey(),
    member_id: integer('member_id').notNull().references(() => Members.id, { onDelete: 'cascade' }),
    content: text("content").notNull(),
    created_at: timestamp("created_at").notNull().defaultNow(),
    updated_at: timestamp("updated_at").notNull().defaultNow(),
});

export const postsRelations = relations(Posts, ({ one }) => ({
    member: one(Members, {
        fields: [Posts.member_id],
        references: [Members.id],
    }),
}));

export type InsertMember = typeof Members.$inferInsert;
export type SelectMember = typeof Members.$inferSelect;

export type InsertPost = typeof Posts.$inferInsert;
export type SelectPost = typeof Posts.$inferSelect;