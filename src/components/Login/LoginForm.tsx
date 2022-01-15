import {Button, Checkbox, Form, Input} from "antd";
import {useForm} from "antd/es/form/Form";
import {SaveTwoTone} from "@ant-design/icons";
import React, {FC} from "react";

export const LoginForm: FC = () => {
    // const { form } = useForm();
    return (<>
        <Form
            layout='horizontal'
            name='loginForm'
            scrollToFirstError={true}
            size='large'
        >
            <Form.Item label='email' name='email'>
                <Input />
            </Form.Item>
            <Form.Item label='password' name='password'>
                <Input />
            </Form.Item>
            <Form.Item label='rememberMe' name='rememberMe'>
                {/*<Checkbox>Remember Me</Checkbox>*/}
            </Form.Item>
            <Form.Item label='captcha' name='captcha'>
                <Input />
            </Form.Item>
        </Form>
    <Button
        htmlType='submit'
        icon={<SaveTwoTone />}
        loading={{delay: 1000}}
        size='large'
        type='primary'
    />
        </>
    )
}