import { configureStore } from '@reduxjs/toolkit';
import chatReducer from '../features/chat/chatSlice';
import authReducer from './slices/authSlice';
import initializeReducer from './slices/initializeSlice';

export const store = configureStore({
	reducer: {
		auth: authReducer,
		initialize: initializeReducer,
		chat: chatReducer,
	},
	// middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
