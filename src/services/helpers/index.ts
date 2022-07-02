import { Description } from '@/constants/serverMessages';
import { ResponseStatus, ReultCode } from '@/constants/systemConstants';
import { AuthResponse, AuthState } from '@/store/slices/authSlice/types';

export const getAuthResponse = (authResponse: AuthResponse): AuthState => {
	if (authResponse.status === ResponseStatus.success) {
		const { authInfo } = authResponse;
		const { success, error } = ReultCode;

		if (authInfo.resultCode === error) {
			return {
				isAuth: false,
				authMessage: authInfo.messages.at(0),
				data: { id: null, email: null, login: null },
			};
		}

		if (authInfo.resultCode === success) {
			const {
				data: { email, id, login },
			} = authInfo;

			return {
				isAuth: true,
				authMessage: authInfo.messages.at(0),
				data: { id, email, login },
			};
		}
	}

	return {
		isAuth: false,
		authMessage: Description.someError,
		data: { id: null, email: null, login: null },
	};
};
