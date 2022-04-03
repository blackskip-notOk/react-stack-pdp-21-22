import { FC, useEffect, useReducer } from 'react';
import buttonStyles from '@styles/Button.module.less';
import inputStyles from '@styles/Input.module.less';
import { preventDefault } from '../../../utils';
import { useNavigate } from 'react-router-dom';
import styles from '../Login.module.less';
import {
	$captchaUrl,
	$loginResponse,
	$serverSideError,
	getCaptchaFx,
	loginFx,
} from '../../../models/login/index';
import { useStore } from 'effector-react';
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
import { $auth } from '../../../models/auth';
import { NAVLINKS } from '../../../constants/routerConstants';
import { LoginFormData } from '../../../models/login/types';

export const LoginForm: FC = () => {
	const navigate = useNavigate();

	const fetchingLoginData = useStore(loginFx.pending);
	const fetchingCaptchaUrl = useStore(getCaptchaFx.pending);
	const serverSideError = useStore($serverSideError);
	const captchaUrl = useStore($captchaUrl);
	const { isAuth } = useStore($auth);
	const { error: loginError, isNeedCaptcha } = useStore($loginResponse);

	useEffect(() => {
		isAuth && navigate(NAVLINKS.HOME);
	}, [isAuth]);

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormData>({
		defaultValues: {
			email: '',
			password: '',
			rememberMe: true,
			captcha: '',
		},
		resolver: yupResolver(loginSchema),
	});

	const [showPassword, toggleShowPassword] = useReducer((showPassword) => !showPassword, false);

	const onSubmit: SubmitHandler<LoginFormData> = (data) => loginFx(data);

	const handleGetCaptcha = () => {
		getCaptchaFx(true);
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
								helperText={errors.email?.message ?? ' '}
								error={!!errors.email || !!loginError}
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
								error={!!errors.password || !!loginError}
							>
								Password
							</InputLabel>
							<OutlinedInput
								{...field}
								id='password'
								label='Password'
								type={showPassword ? 'text' : 'password'}
								margin='dense'
								error={!!errors.password || !!loginError}
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
							<FormHelperText id='passwordError' error={!!errors.password}>
								{errors.password?.message ?? ' '}
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
									helperText={errors.captcha?.message ?? ' '}
									error={!!errors.captcha}
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
				{serverSideError && (
					<Box className={styles.autorizationError}>{serverSideError.message}</Box>
				)}
				{loginError && <Box className={styles.autorizationError}>{loginError}</Box>}
				<Box className={buttonStyles.buttonContainer}>
					<LoadingButton
						size='large'
						endIcon={<SendIcon />}
						type='submit'
						loading={fetchingLoginData}
						disabled={fetchingLoginData || !isEmpty(errors)}
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
						loading={fetchingCaptchaUrl}
						disabled={fetchingCaptchaUrl}
						loadingPosition='end'
						variant='contained'
						color='success'
					>
						Другая картинка
					</LoadingButton>
					{captchaUrl && <img src={captchaUrl.url} alt='captcha' className={styles.img} />}
				</div>
			)}
		</>
	);
};
