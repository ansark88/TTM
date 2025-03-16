import { Form } from "react-router";

export function PostBox() {
	return (
		<div className="card bg-base-100 shadow-xl">
			<div className="card-body">
				<Form method="post" className="space-y-4">
					<div className="form-control">
						<textarea
							name="content"
							className="textarea textarea-bordered h-24"
							placeholder="今日の努力を記録しよう..."
							required
						/>
					</div>
					<div className="card-actions justify-end">
						<button type="submit" className="btn btn-primary">
							投稿する
						</button>
					</div>
				</Form>
			</div>
		</div>
	);
}
