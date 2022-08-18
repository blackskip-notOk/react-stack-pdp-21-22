/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { appApi, useFetchAuthQuery, useLoginMutation } from '~/store/slices/apiSlice';
import { setupApiStore } from '~/utils/testUtils';
import authReducer from '~/store/slices/authSlice/index';
import { API } from '~/constants/apiConstants';
import {
	authNotAutorized,
	authNotAutorizedState,
	authSuccess,
	authSuccessState,
	loginSuccess,
	loginSuccessState,
} from '~/mocks/testData';
import type { FC, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { act, renderHook } from '@testing-library/react-hooks';

beforeEach((): void => {
	fetchMock.resetMocks();
});

const wrapper: FC<{ children: ReactNode }> = ({ children }) => {
	const storeRef = setupApiStore(appApi, { auth: authReducer });

	return <Provider store={storeRef.store}>{children}</Provider>;
};

const UPDATE_DELAY = 5000;

describe('appApi', () => {
	describe('fetchAuth', () => {
		const storeRef = setupApiStore(appApi, { auth: authReducer });
		fetchMock.mockResponse(JSON.stringify({}));

		test('request is correct', () => {
			// @ts-ignore
			return storeRef.store.dispatch(appApi.endpoints.fetchAuth.initiate(null)).then(() => {
				expect(fetchMock).toBeCalledTimes(1);

				const { method, headers, url } = fetchMock.mock.calls[0][0] as Request;
				const apiToken = headers.get('API-KEY');

				expect(method).toBe('GET');
				expect(apiToken).toBe(API.apiToken);
				expect(url).toBe(`${API.baseURL}/${API.authMe}`);
			});
		});

		test('after transform successful response is correct', () => {
			const storeRef = setupApiStore(appApi, { auth: authReducer });
			fetchMock.mockResponse(JSON.stringify(authSuccess));
			// @ts-ignore
			return storeRef.store
				.dispatch(appApi.endpoints.fetchAuth.initiate(null))
				.then((action: any) => {
					const { status, isSuccess, data } = action;

					expect(status).toBe('fulfilled');
					expect(isSuccess).toBeTruthy();
					expect(data).toStrictEqual(authSuccessState);
				});
		});

		test('if auth success, useFetchAuthQuery should return correct authResponse', async () => {
			fetchMock.mockResponse(JSON.stringify(authSuccess));
			const { result, waitForNextUpdate } = renderHook(() => useFetchAuthQuery(null), { wrapper });
			const initialResponse = result.current;

			expect(initialResponse.data).toBeUndefined();
			expect(initialResponse.isLoading).toBeTruthy();

			await waitForNextUpdate({ timeout: UPDATE_DELAY });
			const nextResponse = result.current;

			expect(nextResponse.data).not.toBeUndefined();
			expect(nextResponse.isLoading).toBeFalsy();
			expect(nextResponse.isError).toBeFalsy();
		});

		test('if auth failed, useFetchAuthQuery should return correct authResponse', async () => {
			fetchMock.mockResponse(JSON.stringify(authNotAutorized));
			const { result, waitForNextUpdate } = renderHook(() => useFetchAuthQuery(null), { wrapper });
			const initialResponse = result.current;

			expect(initialResponse.data).toBeUndefined();
			expect(initialResponse.isLoading).toBeTruthy();

			await waitForNextUpdate({ timeout: UPDATE_DELAY });
			const nextResponse = result.current;

			expect(nextResponse.data).not.toBeUndefined();
			expect(nextResponse.data).toStrictEqual(authNotAutorizedState);
			expect(nextResponse.isLoading).toBeFalsy();
			expect(nextResponse.isError).toBeFalsy();
		});
	});
	describe('login', () => {
		test('success login', async () => {
			fetchMock.mockResponse(JSON.stringify(loginSuccess));

			const { result, waitForNextUpdate } = renderHook(() => useLoginMutation(), { wrapper });

			const [login, initialResponse] = result.current;

			expect(initialResponse.data).toBeUndefined();
			expect(initialResponse.isLoading).toBeFalsy();

			act(() => {
				login({ email: API.testLogin, password: API.testPassword });
			});

			const loadingResponse = result.current[1];

			expect(loadingResponse.data).toBeUndefined();
			expect(loadingResponse.isLoading).toBeTruthy();

			await waitForNextUpdate({ timeout: UPDATE_DELAY });
			const loadedResponse = result.current[1];

			expect(loadedResponse.data).not.toBeUndefined();
			expect(loadedResponse.data).toStrictEqual(loginSuccessState);
			expect(loadedResponse.isLoading).toBeFalsy();
			expect(loadedResponse.isSuccess).toBeTruthy();
		});
	});
});
