export interface BaseResponse {
	resultCode: number;
	messages: Array<string>;
	fieldsErrors: Array<string>;
}
