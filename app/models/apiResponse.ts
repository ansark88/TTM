//　ActionやLoaderのresponseを返すWrapper

import { data } from "react-router";

type ApiError = {
	message: string;
	code?: string;
};

export type ApiResponse<T> = {
	data?: T;
	error?: ApiError;
	fromAction?: string; // formから送った_actionの値。actionによって処理を変えたい時に使う
};

// react-routerのserver側のactionのresponseを返すWrapper
export const SuccessResponse = <T>(d: T, fromAction?: string) => {
	return data<ApiResponse<T>>(
		{ data: d, fromAction: fromAction },
		{ status: 200 },
	);
};

export const SuccessResponseWithNoData = <T = never>(fromAction?: string) => {
	return data<ApiResponse<T>>({ fromAction: fromAction }, { status: 200 });
};

export const InvalidErrorResponse = <T = never>(
	message: string,
	fromAction?: string,
) => {
	return data<ApiResponse<T>>(
		{ error: { message: message }, fromAction: fromAction },
		{ status: 400 },
	);
};

export const ServerErrorResponse = <T = never>(
	message: string,
	fromAction?: string,
) => {
	return data<ApiResponse<T>>(
		{ error: { message: message }, fromAction: fromAction },
		{ status: 500 },
	);
};

// react-routerのclient側のactionのresponseを返すWrapper
export const ClientSuccessResponse = <T>(
	d: T,
	fromAction?: string,
): ApiResponse<T> => {
	return { data: d, fromAction: fromAction };
};

export const ClientSuccessResponseWithNoData = <T = never>(
	fromAction?: string,
): ApiResponse<T> => {
	return { fromAction: fromAction };
};

export const ClientInvalidErrorResponse = <T>(
	message: string,
	fromAction?: string,
): ApiResponse<T> => {
	return { error: { message: message }, fromAction: fromAction };
};

export const ClientServerErrorResponse = <T>(
	message: string,
	fromAction?: string,
): ApiResponse<T> => {
	return { error: { message: message }, fromAction: fromAction };
};
