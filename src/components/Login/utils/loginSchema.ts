import { object, boolean, string } from 'yup';

export const loginSchema = object({
    email: string().defined().email('Enter valid email').required('Email is required'),
    password: string().defined().required('Password is required'),
    rememberMe: boolean().optional(),
    serverError: string(),
    captcha: string()
});