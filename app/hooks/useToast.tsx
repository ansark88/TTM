type ToastType = "info" | "success" | "warning" | "error";

export function useToast() {
	const show = (message: string, type: ToastType = "info") => {
		// 既存のtoastを削除
		const existingToast = document.querySelector(".toast");
		if (existingToast) {
			existingToast.remove();
		}

		// 新しいtoastを作成
		const toast = document.createElement("div");
		toast.className = "toast toast-top toast-center";

		const alert = document.createElement("div");
		alert.className = `alert alert-${type}`;
		alert.textContent = message;
		alert.role = "alert";

		toast.appendChild(alert);
		document.body.appendChild(toast);

		// 3秒後に自動的に消える
		setTimeout(() => {
			toast.remove();
		}, 3000);
	};

	return { show };
}
