import { db } from "~/lib/databaseClient";
import { Members } from "~/schema/schema";
import type { IMemberRepository } from "~/app/domain/repositories/memberRepository";
import type { Member, UpdateMemberInput } from "~/app/domain/entities/member";
import { memberMapper } from "../mappers/memberMapper";
import { eq } from "drizzle-orm";
import type { SelectMember } from "~/schema/schema";
import type { DatabaseClientType } from "~/lib/databaseClient";

// DBのtriggerを使ってcreateしてるのでここではcreateはしない
export class MemberRepository implements IMemberRepository {
	private db: DatabaseClientType;

	constructor(dbClient = db) {
		this.db = dbClient;
	}

	async findAll(): Promise<Member[]> {
		const members = await this.db.select().from(Members);
		return members.map((member: SelectMember) => memberMapper.toDomain(member));
	}

	async findById(id: number): Promise<Member | null> {
		const data = await this.db.select().from(Members).where(eq(Members.id, id));
		return data.length > 0 ? memberMapper.toDomain(data[0]) : null;
	}

	async update(id: number, data: UpdateMemberInput): Promise<Member> {
		const updatedMember = await this.db
			.update(Members)
			.set(memberMapper.toPartialPersistence(data))
			.where(eq(Members.id, id))
			.returning();

		return memberMapper.toDomain(updatedMember[0]);
	}

	async delete(id: number): Promise<void> {
		await this.db.delete(Members).where(eq(Members.id, id));
	}
}
