import { BaseResponse } from './../types';
export type UserId = number;
export type Status = string;

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

export interface ProfileState {
	userId?: UserId;
	aboutMe?: string;
	lookingForAJob: boolean;
	lookingForAJobDescription?: string;
	fullName?: string;
	contacts: Contacts;
	photos: Photos;
}

export interface ProfileStatusState {
	status: Status;
}

type ProfileStatus = Omit<BaseResponse, 'fieldsErrors'>;

export interface ProfileStatusResponse extends ProfileStatus {
	data: Record<string, string>;
}

export interface PhotosData {
	photos: Photos;
}

export interface ProfilePhotoResponse extends BaseResponse {
	data: PhotosData;
}
