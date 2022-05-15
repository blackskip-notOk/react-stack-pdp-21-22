import { Alert, Slide, Snackbar } from '@mui/material';
import { useStore } from 'effector-react';
import { FC, useEffect, useState } from 'react';
import { ERROR_MESSAGE_DURATION } from '@/constants/systemConstants';
import { $owner } from '@/models/auth';
import { $profile, $profileError, $profileLoading, getProfileFx } from '@/models/profile';
import styles from './Profile.module.less';
import { Loader } from '../common/loader/Loader';

export const Profile: FC = () => {
	const { ownerId } = useStore($owner);
	const profileError = useStore($profileError);
	const profileData = useStore($profile);
	const isProfileLoading = useStore($profileLoading);

	const [showErrow, setShowError] = useState(false);

	useEffect(() => {
		if (profileError) {
			setShowError(true);
		}
	}, [profileError]);

	useEffect(() => {
		if (ownerId && !profileData.userId) {
			getProfileFx(ownerId);
		}
	}, [ownerId, profileData.userId, getProfileFx]);

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
