import { Link } from "react-router";

export default function MyHome({ members }) {
	// debug用に memberの一覧を出す
	return (
		<ul>
			{members.map((member) => (
				<li key={member.id}>
					<Link to={`/members/${member.id}`}>{member.name}</Link>
				</li>
			))}
		</ul>
	);
}
