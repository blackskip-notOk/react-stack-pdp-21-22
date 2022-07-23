import { Alert, Slide, Snackbar } from '@mui/material';
import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { NAVLINKS } from '@/constants/routerConstants';
import { ERROR_MESSAGE_DURATION } from '@/constants/systemConstants';
import { Posts } from '../Post/Posts';
import styles from './Home.module.less';
import { HomeProps } from './types';
import { BackgroundUniverse } from '@/components/common/Background/BackgroundUniverse';
import { useAppSelector } from '@/hooks/storeHooks';
import { isAuthSelector } from '@/store/selectors/authSelectors';

export const Home: FC<HomeProps> = ({ showGreeting, setShowGreeting }) => {
	const navigate = useNavigate();
	const isAuth = useAppSelector(isAuthSelector);

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
