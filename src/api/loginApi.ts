import { API } from '@/constants/apiConstants';
import { instance } from '.';
import { LoginFormData, LoginResponse, LogoutResponse } from '@/models/login/types';

export const fetchLoginApi = async (loginData: LoginFormData): Promise<LoginResponse> => {
	const response = await instance.post(API.login, loginData);
	return response.data;
};

export const fetchLogoutApi = async (): Promise<LogoutResponse> => {
	const response = await instance.post(API.logout);
	return response.data;
};
