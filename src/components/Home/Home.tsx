import { Alert, Slide, Snackbar } from '@mui/material';
import { useStore } from 'effector-react';
import { FC, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { NAVLINKS } from '@/constants/routerConstants';
import { ERROR_MESSAGE_DURATION, SESSION_STORAGE } from '@/constants/systemConstants';
import { $auth } from '@/models/auth';
import { Posts } from '../Post/Posts';
import styles from './Home.module.less';
import { HomeProps } from './types';
import { BackgroundUniverse } from '@/components/common/Background/BackgroundUniverse';

export const Home: FC<HomeProps> = ({ showGreeting, setShowGreeting }) => {
	const location = useLocation();
	const navigate = useNavigate();

	const { isAuth } = useStore($auth);

	useEffect(() => {
		sessionStorage.setItem(SESSION_STORAGE.LOCATION, location.pathname);
	});

	useEffect(() => {
		if (!isAuth) {
			navigate(NAVLINKS.LOGIN, { replace: true });
		}
	}, [isAuth]);

	const handleErrorClose = () => {
		setShowGreeting(false);
	};

	return (
		<>
			<div className={styles.homeContainer}>
				<BackgroundUniverse />
				<Posts />
			</div>
			<Snackbar
				open={showGreeting}
				autoHideDuration={ERROR_MESSAGE_DURATION}
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
				TransitionComponent={Slide}
				onClose={handleErrorClose}
			>
				<Alert onClose={handleErrorClose} color='success' severity='success'>
					<span className={styles.greetingSpan}>{'Добро Пожаловать'}</span>
				</Alert>
			</Snackbar>
		</>
	);
};
