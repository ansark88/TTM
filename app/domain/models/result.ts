// domain層はpromise型を使い、コントローラ（app層)でresult型を使う
// domain層ではErrorをraiseし、catchしてresult変換するのはコントローラ
export type Result<T> = {
	data?: T;
	error?: string;
};
