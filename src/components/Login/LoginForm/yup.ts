import * as yup from "yup";

yup.setLocale({
    mixed: ({
        default: 'Поле заполнено неверно'
    }),

})

export const schema = yup.object().shape({
    email: yup.string().email('email не соответствует формату').required('заполните поле'),
    password: yup.string().required('заполните поле'),
    rememberMe: yup.boolean(),
});