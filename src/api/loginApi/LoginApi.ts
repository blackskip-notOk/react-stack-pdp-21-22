import { AxiosError } from 'axios';
import { AuthResponse, LoginResponse } from './types';
import { instance } from './../index';
import { useMutation } from 'react-query';
import { API, MUTATION_KEYS } from '../../constants/apiConstants';
import { LoginFormData } from '../../components/Login/LoginForm/types';

export const fetchInizialize = async (): Promise<AuthResponse> => {
	const response = await instance.get(API.authMe);
	return {status: response.status, authInfo: response.data};
};

const login = async (loginData: LoginFormData): Promise<LoginResponse> => {
	const response = await instance.post(API.login, loginData);
	return response.data;
};

export const useLogin = () => {
	return useMutation<LoginResponse, AxiosError, LoginFormData>([MUTATION_KEYS.LOGIN], login);
}