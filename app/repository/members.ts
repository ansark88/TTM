import type { Result } from "~/models/result";
import { db } from "../../lib/databaseClient";
import { type SelectMember, Members } from "../../schema/schema";

export class MemberRepository {
	async findAll(): Promise<Result<SelectMember[]>> {
		try {
			const result = await db.select().from(Members);

			return {
				data: result,
			};
		} catch (error) {
			if (error instanceof Error) {
				// 具体的なエラータイプの処理
				console.error("データベースエラー:", error.message);
				return {
					error: "データベースの接続に問題が発生しました",
				};
			}

			// 予期せぬエラーの処理
			console.error("予期せぬエラー:", error);
			return {
				error: "予期せぬエラーが発生しました",
			};
		}
	}
}
