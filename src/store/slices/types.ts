import { ReultCode } from '@/constants/systemConstants';

type ResultCodeKeys = keyof typeof ReultCode;
type ResultCodeValues = typeof ReultCode[ResultCodeKeys];
export interface BaseResponse {
	resultCode: ResultCodeValues;
	messages: Array<string>;
	fieldsErrors: Array<string>;
}

export interface BaseError {
	status?: number;
	message?: string;
}
