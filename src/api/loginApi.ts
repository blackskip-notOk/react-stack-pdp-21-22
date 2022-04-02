import { API } from './../constants/apiConstants';
import { instance } from '.';
import { LoginFormData, LoginResponse } from './../models/login/types';

export const fetchLoginApi = async (loginData: LoginFormData): Promise<LoginResponse> => {
	const response = await instance.post(API.login, loginData);
	return response.data;
};