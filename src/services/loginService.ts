import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API, ApiName } from '@/constants/apiConstants';
import { instance } from '.';
import { AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { LoginResponse, LoginFormData, CaptchaUrlResponse } from '@/store/slices/loginSlice/types';
import { Method } from '@/constants/systemConstants';

export const loginApi = createApi({
	reducerPath: ApiName.login,
	baseQuery: fetchBaseQuery({ baseUrl: API.baseURL }),
	endpoints: (build) => ({
		login: build.mutation<LoginResponse, LoginFormData>({
			query: (data: LoginFormData) => ({
				url: API.login,
				method: Method.post,
				body: data,
			}),
		}),
	}),
});

export const fetchCaptcha = createAsyncThunk(ApiName.captcha, async (_, thunkApi) => {
	try {
		const response = await instance.get<CaptchaUrlResponse>(API.captchaUrl);
		return response.data;
	} catch (err) {
		const error = err as AxiosError;
		return thunkApi.rejectWithValue(error.message);
	}
});
