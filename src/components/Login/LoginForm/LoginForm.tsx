import { FC, useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useLogin } from '../../../api/loginApi/LoginApi';
import { LoginFormData } from './types';
import { Input, Checkbox, Button, Form } from 'antd';
import inputStyles from '../../../styles/Input.module.css';
import buttonStyles from '../../../styles/Button.module.css';
import { preventDefault } from '../../../utils';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './yup';
import { loginErrorTransform } from '../utils';
import { getCaptchaUrl } from '../../../api/securityApi/SecurityApi';
import { inizialize } from '../../../effector/initialStore/InitialStore';
import { RESULT_CODES } from '../../../constants/systemConstants';
import { useNavigate } from 'react-router-dom';
import { NAVLINKS } from '../../../constants/routerConstants';
import { setOwner } from '../../../effector/ownerStore/ownerStore';

export const LoginForm: FC = () => {
	const navigate = useNavigate();

	const [captchaUrl, setCaptchaUrl] = useState('');
	const [serverError, setServerError] = useState<string | null>(null);

	const login = useLogin();
	const { mutate, isError, isLoading, error, data } = login;

	const isNeedCaptcha = data?.resultCode === RESULT_CODES.secure;

	const {
		control,
		handleSubmit,
		formState: { errors, isDirty, isSubmitting, isValidating },
	} = useForm<LoginFormData>({
		mode: 'onSubmit',
		reValidateMode: 'onChange',
		criteriaMode: 'all',
		shouldFocusError: true,
		shouldUnregister: true,
		resolver: yupResolver(schema),
	});

	const onSubmit: SubmitHandler<LoginFormData> = (data) => {
		const loginData = {
			email: data.email,
			password: data.password,
			rememberMe: data.rememberMe,
			captcha: data.captcha,
		};
		mutate(loginData);
	};

	useEffect(() => {
		if (data && data.resultCode === RESULT_CODES.success) {
			inizialize({ inizialized: true, message: data.messages[0] });
			setOwner({isOwner: true, ownerId: data.data.userId});
			navigate(NAVLINKS.HOME);
		}
	}, [data]);

	useEffect(() => {
		setServerError(loginErrorTransform(data));
	}, [data]);

	useEffect(() => {
		isNeedCaptcha &&
			getCaptchaUrl().then((response) => {
				setCaptchaUrl(response.url);
			});
	}, [isNeedCaptcha]);

	const handleGetCaptcha = () => {
		getCaptchaUrl().then((response) => {
			setCaptchaUrl(response.url);
		});
	};

	return (
		<>
			<Form
				layout='vertical'
				name='login'
				scrollToFirstError
				size='large'
				onFinish={handleSubmit(onSubmit)}
			>
				<Form.Item
					className={inputStyles.container}
					htmlFor='email'
					label='Email'
					required
				>
					<Controller
						name='email'
						control={control}
						render={({ field }) => (
							<Input
								{...field}
								allowClear
								size='middle'
								type='email'
								placeholder='Введите email'
								onPressEnter={preventDefault}
							/>
						)}
					/>
					<p>{errors.email?.message}</p>
				</Form.Item>
				<Form.Item
					className={inputStyles.container}
					htmlFor='password'
					label='Password'
					required
				>
					<Controller
						name='password'
						control={control}
						render={({ field }) => (
							<Input.Password
								{...field}
								allowClear
								size='middle'
								type='password'
								placeholder='Введите пароль'
								onPressEnter={preventDefault}
								iconRender={(visible) =>
									visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
								}
							/>
						)}
					/>
					<p>{errors.password?.message}</p>
				</Form.Item>
				<Form.Item
					className={inputStyles.container}
					htmlFor='rememberMe'
					label='Remember me?'
					valuePropName='checked'
				>
					<Controller
						name='rememberMe'
						control={control}
						render={({ field: { value, onChange, ...restProps } }) => (
							<Checkbox {...restProps} onChange={onChange} checked={value} />
						)}
					/>
				</Form.Item>
				{isNeedCaptcha && (
					<Form.Item
						className={inputStyles.container}
						htmlFor='captcha'
						label='Captcha code'
						required
					>
						<Controller
							name='captcha'
							control={control}
							render={({ field }) => (
								<Input
									{...field}
									allowClear
									size='middle'
									type='text'
									placeholder='Введите код с картинки'
									onPressEnter={preventDefault}
								/>
							)}
						/>
					</Form.Item>
				)}
				{isError && <p>{error?.message}</p>}
				{serverError && <p>{serverError}</p>}
				<Form.Item className={buttonStyles.buttonContainer}>
					<Button
						disabled={!isDirty}
						htmlType='submit'
						loading={isSubmitting || isValidating || isLoading}
						shape='round'
						size='middle'
						type='primary'
					>
						Логин
					</Button>
				</Form.Item>
			</Form>
			{isNeedCaptcha && (
				<div className={buttonStyles.buttonContainer}>
					<Button
						onClick={handleGetCaptcha}
						shape='round'
						size='middle'
						type='primary'
					>
						Другая картинка
					</Button>
					{captchaUrl && <img src={captchaUrl} alt='captcha' />}
				</div>
			)}
		</>
	);
};
