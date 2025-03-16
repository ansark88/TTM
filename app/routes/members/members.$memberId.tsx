// app/routes/users.$userId.tsx
import { useLoaderData } from "react-router";
import { Post } from "~/components/post";
import { db } from "../../../lib/databaseClient";
import { Members, Posts } from "schema/schema";
import { desc, eq } from "drizzle-orm";
import type { Route } from "./+types/members.$memberId";
import default_user_icon from "../../../public/default_user_icon.png";

export async function loader({ params }: Route.LoaderArgs) {
	try {
		console.log(params);

		// メンバー情報の取得
		const member = await db
			.select()
			.from(Members)
			.where(eq(Members.id, Number(params.id)))
			.limit(1);

		console.log(member);

		if (!member[0]) {
			throw new Error("User not found");
		}

		// ユーザーの投稿を取得
		const userPosts = await db
			.select()
			.from(Posts)
			.where(eq(Posts.memberID, member[0].id))
			.orderBy(desc(Posts.createdAt));

		console.log(userPosts);

		return {
			member: member[0],
			posts: userPosts,
		};
	} catch (error) {
		console.error(error);
		throw new Error("Failed to load user data");
	}
}

export default function MemberPage({ loaderData }: Route.ComponentProps) {
	const { member, posts } = loaderData;

	return (
		<div className="container mx-auto p-4">
			{/* ユーザープロフィール */}
			<div className="card bg-base-100 shadow-xl mb-8">
				<div className="card-body">
					<div className="flex items-center gap-6">
						<div className="avatar">
							<div className="w-24 rounded-full">
								<img
									src={member.iconUrl || default_user_icon}
									alt={member.name}
								/>
							</div>
						</div>
						<div>
							<h1 className="text-2xl font-bold">{member.name}</h1>
							<p className="text-base-content/70">投稿数: {posts.length}</p>
							{member.bio && (
								<p className="mt-2 whitespace-pre-wrap">{member.bio}</p>
							)}
						</div>
					</div>
				</div>
			</div>

			{/* 投稿一覧 */}
			<div className="space-y-4">
				<h2 className="text-xl font-bold mb-4">投稿一覧</h2>
				{posts.map((post) => (
					<Post
						key={post.id}
						post={{
							...post,
							member: {
								id: member.id,
								name: member.name,
								icon_url: member.iconUrl || undefined,
							},
						}}
					/>
				))}
			</div>
		</div>
	);
}
