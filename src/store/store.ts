import { combineReducers, configureStore } from '@reduxjs/toolkit';
import type { PreloadedState } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import chatReducer from './slices/chatSlice';
import { appApi } from './slices/apiSlice';
import authReducer from './slices/authSlice';
import initializeReducer from './slices/initializeSlice';
import loginRequestReducer from './slices/loginRequestSlice';
import loginResponseReducer from './slices/loginResponseSlice';
import captchaReducer from './slices/captchaSlice';
import profileReducer from './slices/profileSlice';
import profileStatusReducer from './slices/profileSlice/status';
import usersReducer from './slices/usersSlice';
import usersRequestReducer from './slices/usersSlice/request';

const rootReducer = combineReducers({
	[appApi.reducerPath]: appApi.reducer,
	auth: authReducer,
	initialize: initializeReducer,
	loginRequest: loginRequestReducer,
	loginResponse: loginResponseReducer,
	captcha: captchaReducer,
	profile: profileReducer,
	status: profileStatusReducer,
	users: usersReducer,
	usersRequest: usersRequestReducer,
	chat: chatReducer,
});

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(appApi.middleware),
});

setupListeners(store.dispatch);

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
	return configureStore({
		reducer: rootReducer,
		preloadedState,
		middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(appApi.middleware),
	});
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
