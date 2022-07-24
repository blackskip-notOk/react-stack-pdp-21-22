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
import { useLoginSchema } from '../utils/loginSchema';
import { Box } from '@mui/system';
import { isEmpty } from 'ramda';
import { NAVLINKS } from '@/constants/routerConstants';
import { LoginProps } from '../types';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHooks';
import { isAuthSelector } from '@/store/selectors/authSelectors';
import {
	captchaStateSelector,
	loginRequestStateSelector,
	loginResponseStateSelector,
} from '@/store/selectors/loginSelector';
import { LoginRequestState } from '@/store/slices/loginRequestSlice/types';
import { initialState, setLoginRequestData } from '@/store/slices/loginRequestSlice';
import { useFetchCaptchaQuery, useLoginMutation } from '@/store/slices/apiSlice';
import { setLoginResponseData } from '@/store/slices/loginResponseSlice';
import { setCaptchaData } from '@/store/slices/captchaSlice';
import { useTranslation } from 'react-i18next';

export const LoginForm: FC<LoginProps> = ({ setShowGreeting }) => {
	const { t } = useTranslation();
	const navigate = useNavigate();

	const dispatch = useAppDispatch();
	const isAuth = useAppSelector(isAuthSelector);

	const { email, password, captcha, rememberMe } = useAppSelector(loginRequestStateSelector);
	const { error: loginError, isNeedCaptcha } = useAppSelector(loginResponseStateSelector);
	const { captchaUrl } = useAppSelector(captchaStateSelector);

	const [login, { isLoading: loginLoading }] = useLoginMutation();
	const { data: captchaData, refetch } = useFetchCaptchaQuery(null, {
		skip: !isNeedCaptcha,
	});

	const [showPassword, toggleShowPassword] = useReducer(
		(showPassword: boolean) => !showPassword,
		false,
	);

	const loginSchema = useLoginSchema();

	useEffect(() => {
		if (isAuth) {
			setShowGreeting(true);
			dispatch(setLoginRequestData(initialState));
			navigate(NAVLINKS.HOME);
		}
	}, [isAuth]);

	useEffect(() => {
		if (captchaData) {
			dispatch(setCaptchaData(captchaData));
		}
	}, [captchaData]);

	const {
		control,
		handleSubmit,
		formState: { errors: formErrors },
	} = useForm<LoginRequestState>({
		defaultValues: { email, password, rememberMe, captcha },
		resolver: yupResolver(loginSchema),
	});

	const onSubmit: SubmitHandler<LoginRequestState> = async (data) => {
		dispatch(setLoginRequestData(data));
		const loginResponse = await login(data).unwrap();

		if (loginResponse) {
			dispatch(setLoginResponseData(loginResponse));
		}
	};

	const handleGetCaptcha = () => {
		refetch();
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
								label={t('loginForm.email')}
								variant='outlined'
								helperText={formErrors.email?.message ?? ' '}
								error={!!formErrors.email || !!loginError}
								fullWidth
								color='success'
								margin='normal'
								focused
								placeholder={t('loginForm.emailPlaceholder')}
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
								{t('loginForm.password')}
							</InputLabel>
							<OutlinedInput
								{...field}
								id='password'
								label='Password'
								type={showPassword ? 'text' : 'password'}
								margin='dense'
								error={!!formErrors.password || !!loginError}
								placeholder={t('loginForm.passwordPlaceholder')}
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
							label={t('loginForm.rememberMe')}
							labelPlacement='start'
						/>
					)}
				/>
				{isNeedCaptcha && (
					<Controller
						name='captcha'
						control={control}
						render={({ field }) => (
							<Box className={inputStyles.container}>
								<TextField
									{...field}
									id='captcha'
									label={t('loginForm.captcha')}
									variant='outlined'
									required
									helperText={formErrors.captcha?.message ?? ' '}
									error={!!formErrors.captcha}
									fullWidth
									color='success'
									margin='normal'
									focused
									placeholder={t('loginForm.captchaPlaceholder')}
								/>
							</Box>
						)}
					/>
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
						{t('loginForm.login')}
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
						{t('loginForm.otherPicture')}
					</LoadingButton>
					{captchaUrl && <img src={captchaUrl} alt='captcha' className={styles.img} />}
				</div>
			)}
		</>
	);
};
