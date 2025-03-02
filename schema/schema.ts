
import { pgTable, serial, uuid, varchar, timestamp, text, integer } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { authUsers } from "drizzle-orm/supabase"

// supabaseのauth.usersと紐づける
export const Members = pgTable("members", {
    id: serial('id').primaryKey(),
    userID: uuid('user_id')
    .notNull()
    .references(() => authUsers.id, { 
      onDelete: 'cascade' // ユーザー削除時の動作
    })
    .unique(),
    name: varchar("name", { length: 50 }).notNull(), // @hogehoge のほう
    screenName: varchar("screen_name", { length: 255 }), // 自由に変更できるほう
    bio: varchar("bio", { length: 255 }),
    iconUrl: varchar("icon_url", { length: 2047 }),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const Posts = pgTable("posts", {
    id: serial('id').primaryKey(),
    memberID: integer('member_id').notNull().references(() => Members.id, { onDelete: 'cascade' }),
    content: text("content").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const postsRelations = relations(Posts, ({ one }) => ({
    member: one(Members, {
        fields: [Posts.memberID],
        references: [Members.id],
    }),
}));

export type InsertMember = typeof Members.$inferInsert;
export type SelectMember = typeof Members.$inferSelect;

export type InsertPost = typeof Posts.$inferInsert;
export type SelectPost = typeof Posts.$inferSelect;