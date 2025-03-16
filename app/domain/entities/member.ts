// エンティティの型定義
export type Member = {
	id: number;
	userId: string;
	name: string;
	screenName: string | null;
	bio: string;
	iconUrl: string;
	createdAt: Date;
	isNew: boolean;
};

// ユースケース固有の型
export type CreateMemberInput = Omit<Member, "id" | "createdAt" | "isNew">;
export type UpdateMemberInput = Partial<CreateMemberInput>;
