import type { Member } from "../entities/member";
import type { UpdateMemberInput } from "../entities/member";

// リポジトリのインターフェース
export interface IMemberRepository {
	findAll(): Promise<Member[]>;
	findById(id: number): Promise<Member | null>;
	update(id: number, data: UpdateMemberInput): Promise<Member>;
	delete(id: number): Promise<void>;
}
