import type { Member } from "../entities/member";
import { differenceInHours } from "date-fns";

// ドメインロジックを持つクラス
export class MemberModel {
	constructor(private readonly member: Member) {}

	get isNew(): boolean {
		return this.isWithin24Hours(this.member.createdAt);
	}

	private isWithin24Hours(date: Date): boolean {
		const hours = differenceInHours(new Date(), date);
		return hours <= 24;
	}
}
