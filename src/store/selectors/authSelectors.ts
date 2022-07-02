import { RootState } from '../store';

export const getAuthState = (state: RootState) => state.auth;
export const getIsAuth = (state: RootState) => state.auth.isAuth;
export const getOwnerId = (state: RootState) => state.auth.data.id;
