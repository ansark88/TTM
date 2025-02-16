type ToastType = "info" | "success" | "warning" | "error";

const alertClasses: Record<ToastType, string> = {
	success: "alert alert-success",
	error: "alert alert-error",
	warning: "alert alert-warning",
	info: "alert alert-info",
};

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
		alert.className = alertClasses[type];
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
