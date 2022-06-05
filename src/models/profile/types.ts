import { BaseResponse } from './../types';
export type UserId = number;

export interface Contacts {
	github?: string;
	vk?: string;
	facebook?: string;
	instagram?: string;
	twitter?: string;
	website?: string;
	youtube?: string;
	mainLink?: string;
}

export interface Photos {
	small: string | null;
	large: string | null;
}

export interface ProfileResponse {
	userId?: UserId;
	aboutMe?: string;
	lookingForAJob: boolean;
	lookingForAJobDescription?: string;
	fullName?: string;
	contacts: Contacts;
	photos: Photos;
}

export interface ProfileState extends ProfileResponse {
	isOwner: boolean;
}

type ProfilePhoto = Omit<BaseResponse, 'fieldsErrors'>;

export interface ProfilePhotoResponse extends ProfilePhoto {
	photos: Photos;
}
