import { FC, useMemo } from 'react';
import { Description, ServerMessage } from '@/constants/serverMessages';
import { LoginForm } from './LoginForm/LoginForm';
import styles from './Login.module.less';
import { API } from '@/constants/apiConstants';
import { LoginProps } from './types';
import { useAppSelector } from '@/hooks/storeHooks';
import { getAuthState } from '@/store/selectors/authSelectors';

export const Login: FC<LoginProps> = ({ setShowGreeting }) => {
	const { isAuth, authMessage } = useAppSelector(getAuthState);

	const localMessage = useMemo(() => {
		return authMessage === ServerMessage.notAutorized
			? Description.notAutorized
			: Description.someError;
	}, [authMessage]);

	return (
		<div className={styles.loginContainer}>
			{!isAuth && <div className={styles.autorizationError}>{localMessage}</div>}
			<LoginForm setShowGreeting={setShowGreeting} />
			<div className={styles.singupLinkContainer}>
				<a href={API.singUp} rel='noreferrer' target='blanc' className={styles.singupLink}>
					Зарегистироваться
				</a>
			</div>
		</div>
	);
};
