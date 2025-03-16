import { Outlet } from "react-router";

export default function MemberLayout() {
	return (
		<>
			{/* <aside>Example sidebar</aside> */}
			<main>
				<Outlet />
			</main>
		</>
	);
}
