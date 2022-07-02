import { loginApi } from '@/services/loginService';
import { configureStore } from '@reduxjs/toolkit';
import chatReducer from '../features/chat/chatSlice';
import authReducer from './slices/authSlice';
import initializeReducer from './slices/initializeSlice';
import loginReducer from './slices/loginSlice';

export const store = configureStore({
	reducer: {
		auth: authReducer,
		initialize: initializeReducer,
		login: loginReducer,
		[loginApi.reducerPath]: loginApi.reducer,
		chat: chatReducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(loginApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
