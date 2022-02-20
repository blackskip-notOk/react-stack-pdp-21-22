import { FC } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useLogin } from '../../../api/loginApi/LoginApi';
import { LoginFormData } from './types';
import { Input, Checkbox, Button } from 'antd';
import inputStyles from '../../../styles/Input.module.css';
import buttonStyles from '../../../styles/Button.module.css';
import { preventDefault } from '../../../utils';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

export const LoginForm: FC = () => {
	const login = useLogin();

	// const handleSubmit = (e: SyntheticEvent) => {
	// 	e.preventDefault();

	//     const target = e.currentTarget as typeof e.currentTarget & LoginFormResult

	//     const loginData = {
	// 		email: target.email.value,
	// 		password: target.password.value,
	// 		rememberMe: target.rememberMe.checked,
	// 		captcha: target.captcha ? target.captcha.value : undefined
	// 	};

	//     login.mutate(loginData);
	// };

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormData>();

	const onSubmit: SubmitHandler<LoginFormData> = (data) => {
		const loginData = {
			email: data.email,
			password: data.password,
			rememberMe: data.rememberMe,
		};
		login.mutate(loginData);
	};

	const isDisable = false;
	const isLoading = false;

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className={inputStyles.container}>
				<Controller
					name='email'
					control={control}
					render={({ field }) => (
						<Input
							{...field}
							addonBefore='Email'
							allowClear
							size='middle'
							type='email'
							onPressEnter={preventDefault}
						/>
					)}
				/>
			</div>
			<div className={inputStyles.container}>
				<Controller
					name='password'
					control={control}
					render={({ field }) => (
						<Input.Password
							{...field}
							addonBefore='Password'
							allowClear
							size='middle'
							type='password'
							onPressEnter={preventDefault}
							iconRender={(visible) =>
								visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
							}
						/>
					)}
				/>
			</div>
			<div className={inputStyles.container}>
				<Controller
					name='rememberMe'
					control={control}
					render={({ field }) => <Checkbox {...field}>Remember me?</Checkbox>}
				/>
			</div>
			<div className={buttonStyles.buttonContainer}>
				<Button
					disabled={isDisable}
					htmlType='submit'
					loading={isLoading}
					shape='round'
					size='middle'
					type='primary'
				>
					Login
				</Button>
			</div>
		</form>
	);
};
