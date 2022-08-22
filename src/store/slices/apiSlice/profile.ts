import { API } from '~/constants/apiConstants';
import { Method, Tag } from '~/constants/systemConstants';
import type { ProfilePhotoResponse, Status, UserID } from '../profileSlice/types';

export const fetchProfileApi = {
	query: (userId: UserID | null) => ({
		url: API.profile,
		params: { userId },
	}),
	providesTags: [Tag.profile],
};

export const fetchProfileStatusApi = {
	query: (userId: UserID | null) => ({
		url: API.getProfileStatus,
		params: { userId },
	}),
	providesTags: [Tag.status],
	transformResponse: (response: Status) => ({ status: response }),
};

export const setProfileStatusApi = {
	query: (status: Status) => ({
		url: API.setProfileStatus,
		method: Method.put,
		body: { status },
	}),
	invalidatesTags: [Tag.status],
};

export const setProfileAvatarApi = {
	query: (photo: FormData) => ({
		url: API.profilePhoto,
		method: Method.put,
		body: photo,
	}),
	transformResponse: ({ data }: ProfilePhotoResponse) => ({
		large: data.photos.large,
		small: data.photos.small,
	}),
};
