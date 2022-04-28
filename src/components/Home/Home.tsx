import { Alert, Slide, Snackbar } from '@mui/material';
import { useStore } from 'effector-react';
import { FC, useEffect, useState } from 'react';
import { ERROR_MESSAGE_DURATION } from '../../constants/systemConstants';
import { $auth } from '../../models/auth';
import { Posts } from '../Post/Posts';
import styles from './Home.module.less';
import { HomeProps } from './types';

export const Home: FC<HomeProps> = ({ showGreeting, setShowGreeting }) => {
	const { isAuth } = useStore($auth);

	// useEffect(() => )

	const handleErrorClose = () => {
		setShowGreeting(false);
	};

	return (
		<>
			<div className={styles.homeContainer}>
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
