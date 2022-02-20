import axios from "axios";
import { QueryClient } from "react-query";

export const queryClient = new QueryClient();

export const instance = axios.create({
	baseURL: 'https://social-network.samuraijs.com/api/1.0',
    withCredentials: true,
    headers: {'API-KEY': '2e033ec1-c683-45a9-bc19-12d1729d43cd'},
});