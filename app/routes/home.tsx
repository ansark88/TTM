import type { Route } from "./+types/home";
import { MemberRepository } from "~/app/infrastructure/repositories/memberRepository";
import { MemberUseCase } from "~/app/domain/useCases/member";
import { Link } from "react-router";
import { PostBox } from "~/app/components/postbox";
export function meta(_: Route.MetaArgs) {
	return [
		{ title: "Trusted Training Memories" },
		{ name: "description", content: "Lets' TTM!" },
	];
}

export async function loader({ params }: Route.LoaderArgs) {
	// Todo: あとでまとめたい。Service層を追加するかも
	const memberRepository = new MemberRepository();
	const memberUseCase = new MemberUseCase(memberRepository);

	try {
		const members = await memberUseCase.findAll();
		return { members };
	} catch (error) {
		console.error(error);
		throw new Error(error as string);
	}
}

export default function Home({ loaderData }: Route.ComponentProps) {
	return (
		<>
			<PostBox />

			<ul>
				{loaderData.members.map((member) => (
					<li key={member.id}>
						<Link to={`/members/${member.id}`}>{member.name}</Link>
					</li>
				))}
			</ul>
		</>
	);
}
