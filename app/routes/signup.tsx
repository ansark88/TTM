import { Form, useNavigate } from "react-router";
import { useEffect, useState } from "react";

import { supabase } from "lib/supabaseClient";
import type { Route } from "./+types/signup";
import { useToast } from "~/app/hooks/useToast";
import {
	ClientInvalidErrorResponse,
	ClientServerErrorResponse,
	ClientSuccessResponseWithNoData,
} from "~/app/domain/models/apiResponse";
import { useAuth } from "~/app/hooks/authContext";

export async function clientAction({ request }: Route.ClientActionArgs) {
	const formData = await request.formData();
	const action = formData.get("_action");

	const email = formData.get("email") as string;
	const password = formData.get("password") as string;
	const username = formData.get("username") as string;

	switch (action) {
		case "signup":
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
					return ClientInvalidErrorResponse(error.message);
				}

				console.log(data);

				// 別途ログインしてもらうのでsignupではフロントにはデータを返さない
				return ClientSuccessResponseWithNoData<null>(action);
			} catch (e) {
				console.error(e);

				return ClientServerErrorResponse("Internal Server Error");
			}
		case "login":
			try {
				const { data, error } = await supabase.auth.signInWithPassword({
					email,
					password,
				});

				if (error) {
					console.log(error);
					return ClientInvalidErrorResponse(error.message);
				}

				console.log(data);

				// 成功したらメッセージを出してホームに遷移
				return ClientSuccessResponseWithNoData<null>(action);
			} catch (e) {
				console.error(e);

				return ClientServerErrorResponse("Internal Server Error");
			}
	}
}

export default function Signup({ actionData }: Route.ComponentProps) {
	const [isSignUp, setIsSignUp] = useState(false);
	const context = useAuth();
	const { show } = useToast();
	const navigate = useNavigate();

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		// 最初にページを開いた時の処理
		if (!actionData) {
			console.log(context);
			if (context.user) {
				show("既にログインしています", "info");
			}
			return;
		}

		if (actionData?.error) {
			show(actionData?.error.message, "error");
			return;
		}

		if (actionData?.fromAction === "signup") {
			show("ユーザー登録が完了しました", "success");
			setTimeout(() => {
				navigate("/login");
			}, 1000);
		}

		if (actionData?.fromAction === "login") {
			show("ログインしました", "success");
			setTimeout(() => {
				navigate("/");
			}, 300);
		}
	}, [actionData]);

	return (
		<div className="min-h-screen bg-base-200 flex items-center justify-center">
			<div className="card w-full max-w-xl shadow-2xl bg-base-100 p-4">
				<div className="card-body">
					<h2 className="card-title justify-center text-2xl font-bold mb-4">
						{isSignUp ? "新規登録" : "ログイン"}
					</h2>

					<Form method="post" className="space-y-4">
						<input
							type="hidden"
							name="_action"
							value={isSignUp ? "signup" : "login"}
						/>

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
