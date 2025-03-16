import { db } from "~/lib/databaseClient";
import { Members } from "~/schema/schema";
import type { IMemberRepository } from "~/app/domain/repositories/memberRepository";
import type { Member, UpdateMemberInput } from "~/app/domain/entities/member";
import { memberMapper } from "../mappers/memberMapper";
import { eq } from "drizzle-orm";

// DBのtriggerを使ってcreateしてるのでここではcreateはしない
export class MemberRepository implements IMemberRepository {
	async findAll(): Promise<Member[]> {
		const members = await db.select().from(Members);
		return members.map((member) => memberMapper.toDomain(member));
	}

	async findById(id: number): Promise<Member | null> {
		const data = await db.select().from(Members).where(eq(Members.id, id));
		return data ? memberMapper.toDomain(data[0]) : null;
	}

	async update(id: number, data: UpdateMemberInput): Promise<Member> {
		const updatedMember = await db
			.update(Members)
			.set(memberMapper.toPartialPersistence(data))
			.where(eq(Members.id, id))
			.returning();

		return memberMapper.toDomain(updatedMember[0]);
	}

	async delete(id: number): Promise<void> {
		await db.delete(Members).where(eq(Members.id, id));
	}
}
