import { inizialization } from '../store/slices/initializeSlice';
import { API, ApiName } from '@/constants/apiConstants';
import { instance } from '.';
import { Auth } from '@/store/slices/authSlice/types';
import { AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAuthResponse } from './helpers';

export const fetchAuth = createAsyncThunk(ApiName.auth, async (_, thunkApi) => {
	try {
		const response = await instance.get<Auth>(API.authMe);

		const authData = getAuthResponse({ status: response.status, authInfo: response.data });

		return authData;
	} catch (err) {
		const error = err as AxiosError;
		return thunkApi.rejectWithValue(error.message);
	} finally {
		thunkApi.dispatch(inizialization(true));
	}
});
