import { Alert, Slide, Snackbar } from '@mui/material';
import { useStore } from 'effector-react';
import { FC, useEffect, useState } from 'react';
import { ERROR_MESSAGE_DURATION, SESSION_STORAGE } from '@/constants/systemConstants';
import { $owner } from '@/models/auth';
import { $profile, $profileError, $profileLoading, getProfileFx } from '@/models/profile';
import styles from './Profile.module.less';
import { Loader } from '../common/loader/Loader';
import { useLocation } from 'react-router-dom';

export const Profile: FC = () => {
	const location = useLocation();

	const { ownerId } = useStore($owner);
	const profileError = useStore($profileError);
	const profileData = useStore($profile);
	const isProfileLoading = useStore($profileLoading);

	const [showErrow, setShowError] = useState(false);

	useEffect(() => {
		sessionStorage.setItem(SESSION_STORAGE.LOCATION, location.pathname);
	});

	useEffect(() => {
		if (profileError) {
			setShowError(true);
		}
	}, [profileError]);

	useEffect(() => {
		if (ownerId && !profileData.userId) {
			getProfileFx(ownerId);
		}
	}, []);

	const handleErrorClose = () => {
		setShowError(false);
	};

	return (
		<div className={styles.profileContainer}>
			{isProfileLoading && <Loader />}
			{!isProfileLoading && (
				<>
					<div>{profileData.fullName}</div>
					<div>{profileData.lookingForAJobDescription}</div>
				</>
			)}
			<Snackbar
				open={showErrow}
				autoHideDuration={ERROR_MESSAGE_DURATION}
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
				TransitionComponent={Slide}
				onClose={handleErrorClose}
			>
				<Alert onClose={handleErrorClose} color='error' severity='error'>
					<span className={styles.profileError}>{profileError?.message}</span>
				</Alert>
			</Snackbar>
		</div>
	);
};
