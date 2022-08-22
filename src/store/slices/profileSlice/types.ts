import { BaseResponse } from './../types';

/** Имитация номинального типа. Использование маркированных типов
 * может существенно повысить безопасность программы.
 * Особенность маркированных типов - они препятствуют появлению на их месте неверного
 * типа. Используем в качестве маркировки unique symbol, потому что это один
 * из двух поистине номинальных видов типов в TypeScript (второй — это
 * enum)
 **/

export type UserID = number & { readonly brand: unique symbol };

/** Функция для создагия значения типа UserID.
 * Для этого используем паттерн объект-компаньон. Создадим конструктор
 * для маркированного типа, используя утверждение типа, которое
 * позволит получить значения:
 **/

export function UserID(id: number) {
	return id as UserID;
}

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
