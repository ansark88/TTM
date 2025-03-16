import type { Member, UpdateMemberInput } from "../entities/member";
import type { IMemberRepository } from "../repositories/memberRepository";

export class MemberUseCase {
	constructor(private memberRepository: IMemberRepository) {}

	async findAll(): Promise<Member[]> {
		return this.memberRepository.findAll();
	}

	async findById(id: number): Promise<Member | null> {
		return this.memberRepository.findById(id);
	}

	async update(id: number, data: UpdateMemberInput): Promise<Member> {
		// バリデーションやビジネスロジック
		const member = await this.memberRepository.update(id, data);
		return member;
	}

	async delete(id: number): Promise<void> {
		await this.memberRepository.delete(id);
	}
}
