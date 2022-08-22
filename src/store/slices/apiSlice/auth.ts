import { API } from '~/constants/apiConstants';
import { Tag } from '~/constants/systemConstants';
import { getAuthResponse } from '~/helpers';
import type { Auth } from '../authSlice/types';

export const authApi = {
	query: () => API.authMe,
	keepUnusedDataFor: 60,
	transformResponse: (response: Auth) => getAuthResponse(response),
	providesTags: [Tag.auth],
};
