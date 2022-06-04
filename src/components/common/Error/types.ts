import { AxiosError } from 'axios';

export interface ErrorMessageProps {
	error: AxiosError | Error;
}
