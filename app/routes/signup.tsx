import { Form } from "react-router";
import { useState } from "react";
import { supabase } from "lib/supabaseClient";
import type { Route } from "./+types/signup";

export async function action({ request }: Route.ActionArgs) {
	const formData = await request.formData();
	const email = formData.get("email") as string;
	const password = formData.get("password") as string;
	const username = formData.get("username") as string;

	try {
		const { data, error } = await supabase.auth.signUp({
			email,
			password,
			options: {
				data: {
					username,
				},
			},
		});

		if (error) {
			console.log(error);
			return { error: error.message };
		}

		console.log(data);
		return { success: true, user: data.user };
	} catch (error) {
		return { error: "サインアップ中にエラーが発生しました" };
	}
}

export default function Signup({ actionData }: Route.ComponentProps) {
	const [isSignUp, setIsSignUp] = useState(false);

	return (
		<div className="min-h-screen bg-base-200 flex items-center justify-center">
			<div className="card w-full max-w-xl shadow-2xl bg-base-100 p-4">
				{actionData?.error && (
					<div className="alert alert-error">
						<span>{actionData.error}</span>
					</div>
				)}

				<div className="card-body">
					<h2 className="card-title justify-center text-2xl font-bold mb-4">
						{isSignUp ? "新規登録" : "ログイン"}
					</h2>

					<Form method="post" className="space-y-4">
						{isSignUp && (
							<div className="form-control">
								<label className="input" htmlFor="username">
									<span className="label">ユーザー名</span>
									<input
										type="text"
										name="username"
										placeholder="ユーザー名"
										className="w-full max-w-xs"
										required
									/>
								</label>
							</div>
						)}

						<div className="form-control">
							<label className="input" htmlFor="email">
								<span className="label">メールアドレス</span>
								<input
									type="email"
									name="email"
									placeholder="example@example.com"
									className="w-full max-w-xs"
									required
								/>
							</label>
						</div>

						<div className="form-control">
							<label className="input" htmlFor="password">
								<span className="label">パスワード</span>
								<input
									type="password"
									name="password"
									placeholder="パスワード"
									className="w-full max-w-xs"
									required
								/>
							</label>
							{!isSignUp && (
								<p className="text-center">
									<a href="#" className="link link-hover">
										パスワードをお忘れですか？
									</a>
								</p>
							)}
						</div>

						<div className="text-center form-control mt-6">
							<button type="submit" className="btn btn-primary">
								{isSignUp ? "登録する" : "ログイン"}
							</button>
						</div>
					</Form>

					<div className="text-center mt-4">
						<button
							type="button"
							className="btn btn-secondary"
							onClick={() => setIsSignUp(!isSignUp)}
						>
							{isSignUp
								? "すでにアカウントをお持ちですか？"
								: "アカウントをお持ちでない方は新規登録"}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
