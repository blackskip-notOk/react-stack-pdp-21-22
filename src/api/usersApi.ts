import { AxiosError } from 'axios';
import { API } from '@/constants/apiConstants';
import { instance } from '.';
import { UsersRequest, UsersResponse } from '@/models/users/types';
import { setUsersError, setUsersLoading } from '@/models/users';

export const fetchUsersApi = async (requestParams: UsersRequest): Promise<UsersResponse> => {
	setUsersLoading(true);

	try {
		const response = await instance.get(API.users, { params: { ...requestParams } });
		return response.data;
	} catch (e: unknown) {
		const error = e as AxiosError;
		if (error.isAxiosError) {
			setUsersError(error);
		}
		throw error;
	} finally {
		setUsersLoading(false);
	}
};
