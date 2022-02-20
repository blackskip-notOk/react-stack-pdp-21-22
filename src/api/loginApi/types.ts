interface BaseResponse {
    resultCode: number,
    messages: Array<string>,
    fieldsErrors: Array<string>
};
interface AuthData {
    id: number,
    email: string,
    login: string
};
export interface Auth extends BaseResponse {
    data: AuthData,
};
export interface AuthResponse {
    status: number,
    authInfo: Auth
};

export interface LoginResponse {
    userId: number
};

type Login = Omit<BaseResponse, 'fieldsErrors'>;
export interface LoginResponse extends Login {
    data: LoginResponse
};