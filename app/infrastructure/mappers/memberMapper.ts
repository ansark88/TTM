import type { SelectMember, InsertMember } from "~/schema/schema";
import type {
	Member,
	CreateMemberInput,
	UpdateMemberInput,
} from "~/app/domain/entities/member";
import { MemberModel } from "~/app/domain/models/member";

// クラスを関数に変換
export const memberMapper = {
	toDomain(raw: SelectMember): Member {
		const member = {
			id: raw.id,
			userId: raw.userID,
			name: raw.name,
			screenName: raw.screenName,
			bio: raw.bio ?? "",
			iconUrl: raw.iconUrl ?? "",
			createdAt: raw.createdAt,
			isNew: false, // 一時的な値
		};

		// MemberModelを使用して派生プロパティを計算
		const model = new MemberModel(member);
		return {
			...member,
			isNew: model.isNew,
		};
	},

	toPersistence(member: CreateMemberInput): InsertMember {
		return {
			userID: member.userId,
			name: member.name,
			screenName: member.screenName,
			bio: member.bio,
			iconUrl: member.iconUrl,
		};
	},

	toPartialPersistence(member: UpdateMemberInput): Partial<InsertMember> {
		return {
			...(member.userId && { userID: member.userId }),
			...(member.name && { name: member.name }),
			...(member.screenName && { screenName: member.screenName }),
			...(member.bio && { bio: member.bio }),
			...(member.iconUrl && { iconUrl: member.iconUrl }),
		};
	},
};
