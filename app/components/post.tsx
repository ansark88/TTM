import default_user_icon from "../../public/default_user_icon.png";

type PostProps = {
	post: {
		id: number;
		content: string;
		createdAt: Date;
		member: {
			id: number;
			name: string;
			icon_url?: string;
		};
	};
};

export function Post({ post }: PostProps) {
	return (
		<div className="card bg-base-100 shadow-xl mb-4">
			<div className="card-body">
				<div className="flex items-center gap-4 mb-4">
					<div className="avatar">
						<div className="w-12 rounded-full">
							<img
								src={post.member.icon_url || default_user_icon}
								alt={post.member.name}
							/>
						</div>
					</div>
					<div>
						<h3 className="font-bold">{post.member.name}</h3>
						<p className="text-sm text-base-content/70">
							{post.createdAt.toLocaleString()}
						</p>
					</div>
				</div>
				<p className="whitespace-pre-wrap">{post.content}</p>
			</div>
		</div>
	);
}
