import * as yup from 'yup';

// export const required = value => {
//     if (value) return undefined;
//
//     return `Field is required`;
// }
//
// export const maxLengthCreator = (max) => (value) => {
//     if (value.length > max) return `Max Length is ${max} symbols`;
//
//     return undefined;
// }
//yup schemas
export const loginFormSchema = yup.object().shape({
    email: yup.string()
        .trim()
        .required('email is required')
        .max(50, 'too long email')
        .email('enter correct email'),
    password: yup.string()
        .required('password is required')
        .min(4, 'too short password')
        .max(20, 'too long password'),
    captcha: yup.string()
});

export const statusSchema = yup.object().shape({
    status: yup.string()
        .max(300, 'maximum 300 symbols')
});

export const newPostSchema = yup.object().shape({
    post: yup.string()
        .required('your post is empty')
        .max(200, 'maximum 200 symbols')
});

export const addMessageSchema = yup.object().shape({
    message: yup.string()
        .required('your message empty')
        .max(150, 'maximum 150 symbols'),
});

export const settingsSchema =  yup.object().shape({
    aboutMe: yup.string()
        .required('this field is required')
        .trim()
        .max(500, 'too long text'),
    jobDescription: yup.string()
        .required('this field is required')
        .max(500, 'too long text'),
    fullName: yup.string()
        .trim()
        .required('nickname is required')
        .max(20, 'too long nick'),
    github: yup.string()
        .trim()
        .url('URL is not valid')
        .max(100, 'too long URL'),
    vk: yup.string()
        .trim()
        .url('URL is not valid'),
    facebook: yup.string()
        .trim()
        .url('URL is not valid'),
    instagram: yup.string()
        .trim()
        .url('URL is not valid'),
    twitter: yup.string()
        .trim()
        .url('URL is not valid'),
    website: yup.string()
        .trim()
        .url('URL is not valid'),
    youtube: yup.string()
        .trim()
        .url('URL is not valid'),
    mainLink: yup.string()
        .trim()
        .url('URL is not valid')
});