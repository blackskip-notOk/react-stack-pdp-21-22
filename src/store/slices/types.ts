export interface BaseResponse {
	resultCode: number;
	messages: Array<string>;
	fieldsErrors: Array<string>;
}

export interface BaseError {
	status?: number;
	message?: string;
}
