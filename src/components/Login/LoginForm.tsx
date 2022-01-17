import { Form, Input, Button, Checkbox } from 'antd';
import {SaveTwoTone} from "@ant-design/icons";
import {useForm} from "react-hook-form";
import {FormData} from "./types/LoginTypes";
import {yupResolver} from "@hookform/resolvers/yup";
import {loginFormSchema} from "../../validations/LoginValidation";

export const LoginForm = () => {
    const {register, handleSubmit, formState: {errors, touchedFields}
    } = useForm<FormData>({
        resolver: yupResolver(loginFormSchema)
    });

    const onSubmit = (data: FormData) => {
        console.log(data.email, data.password, data.rememberMe, data.captcha);
    }

    return (
        <Form
            layout='horizontal'
            name='loginForm'
            scrollToFirstError={true}
            size='large'
            onFinish={handleSubmit(onSubmit)}
            autoComplete='off'
        >
            <Form.Item label='email' name='email'>
                <Input {...register('email')}
                       type='text'
                       placeholder='email@xmail.com'
                />
            </Form.Item>
            <Form.Item label='password' name='password'>
                <Input {...register('password')}
                       type='password'
                       placeholder='minimum 4 symbols'
                />
            </Form.Item>
            <Form.Item label='rememberMe' name='rememberMe'>
                <Checkbox {...register('rememberMe')} type='checkbox'>
                    Remember me?
                </Checkbox>
            </Form.Item>
            <Form.Item label='captcha' name='captcha'>
                <Input {...register('captcha')}
                       type='text'
                       placeholder='enter symbols from image'
                />
            </Form.Item>
            <Button
                form='loginForm'
                htmlType='submit'
                icon={<SaveTwoTone />}
                // loading={{delay: 1000}}
                size='large'
                type='primary'
            >Submit</Button>
        </Form>
    )
}