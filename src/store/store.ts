import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import chatReducer from '../features/chat/chatSlice';
import { appApi } from './slices/apiSlice';
import authReducer from './slices/authSlice';
import initializeReducer from './slices/initializeSlice';
import loginRequestReducer from './slices/loginRequestSlice';
import loginResponseReducer from './slices/loginResponseSlice';
import captchaReducer from './slices/captchaSlice';
import profileReducer from './slices/profileSlice';
import profileStatusReducer from './slices/profileSlice/status';

export const store = configureStore({
	reducer: {
		[appApi.reducerPath]: appApi.reducer,
		auth: authReducer,
		initialize: initializeReducer,
		loginRequest: loginRequestReducer,
		loginResponse: loginResponseReducer,
		captcha: captchaReducer,
		profile: profileReducer,
		status: profileStatusReducer,
		chat: chatReducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(appApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
