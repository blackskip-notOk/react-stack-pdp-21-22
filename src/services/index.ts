import { API } from '@/constants/apiConstants';
import axios from 'axios';

export const instance = axios.create({
	baseURL: API.baseURL,
	withCredentials: true,
	headers: { 'API-KEY': '2e033ec1-c683-45a9-bc19-12d1729d43cd' },
});
