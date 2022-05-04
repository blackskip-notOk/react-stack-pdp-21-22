import { AxiosError } from 'axios';
import { API } from '@/constants/apiConstants';
import { instance } from '.';
import { AuthResponse } from '@/models/auth/types';
import { setAuthLoading } from '@/models/auth';

export const fetchAuthApi = async (): Promise<AuthResponse> => {
	try {
		const response = await instance.get(API.authMe);
		return { status: response.status, authInfo: response.data };
	} catch (err) {
		const error = err as AxiosError;
		throw error;
	} finally {
		setAuthLoading(false);
	}
};
