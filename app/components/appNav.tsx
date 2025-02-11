import { NavLink, useLocation } from "react-router";

// WIP
export function AppNav() {
	const location = useLocation();
	const isLoginPage = location.pathname === "/login";
	const isSignupPage = location.pathname === "/signup";

	// ログインページの場合は簡素なナビゲーションを表示
	if (isLoginPage || isSignupPage) {
		return (
			<>
				<nav className="navbar flex gap-4 p-4 bg-base-200 border-b border-neutral">
					<NavLink to="/" className="btn btn-ghost normal-case text-xl" end>
						Home
					</NavLink>
				</nav>
			</>
		);
	}

	return (
		<>
			<nav className="navbar flex gap-4 p-4 bg-base-200 border-b border-neutral">
				<div className="flex-1 gap-4">
					<NavLink to="/" end>
						Home
					</NavLink>
					<NavLink to="/trending" end>
						Trend
					</NavLink>
				</div>

				<div className="flex-none">
					<ul className="menu menu-horizontal z-[1] p-2 bg-base-100">
						<li>
							<details>
								<summary>プロフィール</summary>
								<ul className="rounded-t-none p-2">
									<li>
										<NavLink to="/settings">設定</NavLink>
									</li>
									<li>
										<NavLink to="/logout">ログアウト</NavLink>
									</li>
								</ul>
							</details>
						</li>
					</ul>
				</div>
			</nav>
		</>
	);
}
