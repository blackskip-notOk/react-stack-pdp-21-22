import { ReultCode, Tag } from '@/constants/systemConstants';

type ResultCodeKeys = keyof typeof ReultCode;
type ResultCodeValues = typeof ReultCode[ResultCodeKeys];

type TagKeys = keyof typeof Tag;
export type TagValues = typeof Tag[TagKeys];

export interface BaseResponse {
	resultCode: ResultCodeValues;
	messages: Array<string>;
	fieldsErrors: Array<string>;
}

export interface BaseError {
	status?: number;
	message?: string;
}
