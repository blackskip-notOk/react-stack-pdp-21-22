import { FC, useMemo } from 'react';
import { ServerMessage } from '~/constants/serverMessages';
import { LoginForm } from './LoginForm/LoginForm';
import styles from './Login.module.less';
import { API } from '~/constants/apiConstants';
import { LoginProps } from './types';
import { useAppSelector } from '~/hooks/storeHooks';
import { authStateSelector } from '~/store/selectors/authSelectors';
import { Button } from '@mui/material';
import { useLoginMutation } from '~/store/slices/apiSlice';
import { useTranslation } from 'react-i18next';

export const Login: FC<LoginProps> = ({ setShowGreeting }) => {
	const { t } = useTranslation();

	const { isAuth, authMessage } = useAppSelector(authStateSelector);

	const [login, { isLoading: loginLoading }] = useLoginMutation();

	const localMessage = useMemo(() => {
		return authMessage === ServerMessage.notAutorized
			? t('auth.notAutorized')
			: t('auth.someError');
	}, [authMessage, t]);

	const handleSendTestAccount = () => {
		login({ email: API.testLogin, password: API.testPassword });
	};

	return (
		<div className={styles.loginContainer}>
			{!isAuth && <div className={styles.autorizationError}>{localMessage}</div>}
			<LoginForm setShowGreeting={setShowGreeting} />
			<div className={styles.singupLinkContainer}>
				<a href={API.singUp} rel='noreferrer' target='blanc' className={styles.singupLink}>
					{t('loginForm.register')}
				</a>
			</div>
			<Button
				className={styles.singupLinkContainer}
				onClick={handleSendTestAccount}
				disabled={loginLoading}
			>
				{t('loginForm.testAccount')}
			</Button>
		</div>
	);
};
