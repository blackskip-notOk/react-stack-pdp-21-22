import { QUERY_KEYS } from './../../constants/apiConstants';
import { AxiosError } from 'axios';
import { CaptchaUrlResponse } from './types';
import { instance } from './../index';
import { useQuery } from 'react-query';
import { API } from '../../constants/apiConstants';

export const getCaptchaUrl = async (): Promise<CaptchaUrlResponse> => {
	const response = await instance.get(API.captchaUrl);
	return response.data;
};