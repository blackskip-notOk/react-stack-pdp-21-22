import { FC, useEffect, useReducer } from 'react';
import buttonStyles from '@/styles/Button.module.less';
import inputStyles from '@/styles/Input.module.less';
import { preventDefault } from '@/utils';
import { useNavigate } from 'react-router-dom';
import styles from '../Login.module.less';
import {
	Checkbox,
	FormControl,
	FormControlLabel,
	FormHelperText,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
	TextField,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import SendIcon from '@mui/icons-material/Send';
import { LoadingButton } from '@mui/lab';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../utils/loginSchema';
import { Box } from '@mui/system';
import { isEmpty } from 'ramda';
import { NAVLINKS } from '@/constants/routerConstants';
import { LoginFormData } from '@/models/login/types';
import { LoginProps } from '../types';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHooks';
import { getIsAuth } from '@/store/selectors/authSelectors';
import { getLoginState } from '@/store/selectors/loginSelector';
import { setLoginData, setLoginResponse } from '@/store/slices/loginSlice';
import { fetchCaptcha, loginApi } from '@/services/loginService';
import { getLoginResponse } from '@/services/helpers';

export const LoginForm: FC<LoginProps> = ({ setShowGreeting }) => {
	const navigate = useNavigate();

	const dispatch = useAppDispatch();
	const isAuth = useAppSelector(getIsAuth);
	const {
		data: { email, password, captcha, rememberMe },
		error: loginError,
		isNeedCaptcha,
		captchaUrl,
	} = useAppSelector(getLoginState);

	const [showPassword, toggleShowPassword] = useReducer((showPassword) => !showPassword, false);

	const [login, { isLoading: loginLoading, data: loginData, error: loginServerError }] =
		loginApi.useLoginMutation();

	useEffect(() => {
		if (isAuth) {
			setShowGreeting(true);
			navigate(NAVLINKS.HOME);
		}
	}, [isAuth]);

	useEffect(() => {
		if (loginData) {
			const loginResponse = getLoginResponse(loginData);

			dispatch(setLoginResponse(loginResponse));

			if (loginResponse.isNeedCaptcha) {
				dispatch(fetchCaptcha());
			}
		}
	}, [loginData]);

	const {
		control,
		handleSubmit,
		formState: { errors: formErrors },
	} = useForm<LoginFormData>({
		defaultValues: { email, password, rememberMe, captcha },
		resolver: yupResolver(loginSchema),
	});

	const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
		dispatch(setLoginData(data));
		await login(data);
	};

	const handleGetCaptcha = () => {
		dispatch(fetchCaptcha());
	};

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Controller
					name='email'
					control={control}
					render={({ field }) => (
						<Box className={inputStyles.container}>
							<TextField
								{...field}
								id='email'
								label='Email'
								variant='outlined'
								helperText={formErrors.email?.message ?? ' '}
								error={!!formErrors.email || !!loginError}
								fullWidth
								color='success'
								margin='normal'
								focused
								placeholder='enter your email'
							/>
						</Box>
					)}
				/>
				<Controller
					name='password'
					control={control}
					render={({ field }) => (
						<FormControl
							color='success'
							variant='outlined'
							fullWidth
							focused
							className={inputStyles.container}
						>
							<InputLabel
								htmlFor='password'
								color='success'
								error={!!formErrors.password || !!loginError}
							>
								Password
							</InputLabel>
							<OutlinedInput
								{...field}
								id='password'
								label='Password'
								type={showPassword ? 'text' : 'password'}
								margin='dense'
								error={!!formErrors.password || !!loginError}
								placeholder='enter your password'
								endAdornment={
									<InputAdornment position='end'>
										<IconButton
											aria-label='toggle password visibility'
											onClick={toggleShowPassword}
											onMouseDown={preventDefault}
											edge='end'
										>
											{showPassword ? (
												<VisibilityOff color='success' />
											) : (
												<Visibility color='success' />
											)}
										</IconButton>
									</InputAdornment>
								}
							/>
							<FormHelperText id='passwordError' error={!!formErrors.password}>
								{formErrors.password?.message ?? ' '}
							</FormHelperText>
						</FormControl>
					)}
				/>
				<Controller
					name='rememberMe'
					control={control}
					defaultValue={true}
					render={({ field }) => (
						<FormControlLabel
							className={styles.checkBox}
							control={
								<Checkbox
									{...field}
									defaultChecked
									sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
									color='success'
									inputProps={{
										'aria-label': 'remember me checkbox',
									}}
								/>
							}
							label='Remember me?'
							labelPlacement='start'
						/>
					)}
				/>{' '}
				{isNeedCaptcha && (
					<Controller
						name='captcha'
						control={control}
						render={({ field }) => (
							<Box className={inputStyles.container}>
								<TextField
									{...field}
									id='captcha'
									label='Captcha'
									variant='outlined'
									required
									helperText={formErrors.captcha?.message ?? ' '}
									error={!!formErrors.captcha}
									fullWidth
									color='success'
									margin='normal'
									focused
									placeholder='enter text from picture'
								/>
							</Box>
						)}
					/>
				)}
				{loginServerError && (
					<Box className={styles.autorizationError}>{loginServerError.message}</Box>
				)}
				{loginError && <Box className={styles.autorizationError}>{loginError}</Box>}
				<Box className={buttonStyles.buttonContainer}>
					<LoadingButton
						size='large'
						endIcon={<SendIcon />}
						type='submit'
						loading={loginLoading}
						disabled={loginLoading || !isEmpty(formErrors)}
						loadingPosition='end'
						variant='contained'
						color='success'
					>
						Логин
					</LoadingButton>
				</Box>
			</form>
			{isNeedCaptcha && (
				<div className={buttonStyles.buttonContainer}>
					<LoadingButton
						onClick={handleGetCaptcha}
						size='large'
						endIcon={<SendIcon />}
						loading={loginLoading}
						disabled={loginLoading || !isEmpty(formErrors)}
						loadingPosition='end'
						variant='contained'
						color='success'
					>
						Другая картинка
					</LoadingButton>
					{captchaUrl && <img src={captchaUrl} alt='captcha' className={styles.img} />}
				</div>
			)}
		</>
	);
};
