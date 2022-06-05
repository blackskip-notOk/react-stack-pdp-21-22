import { Alert, Avatar, Slide, Snackbar } from '@mui/material';
import { useStore } from 'effector-react';
import { ChangeEvent, FC, useState } from 'react';
import { ERROR_MESSAGE_DURATION } from '@/constants/systemConstants';
import { $auth } from '@/models/auth';
import styles from './Profile.module.less';
import { Loader } from '../common/loader/Loader';
import { useGetProfile, useSetProfileAvatar } from '@/api/profileApi';
import { DefaultAvatar } from '../common/avatar/avatar';
import { deepPurple } from '@mui/material/colors';
import { UploadAvatar } from '../common/avatar/uploadAvatar';

export const Profile: FC = () => {
	const { ownerId } = useStore($auth);

	const { data, error, isError, isFetching, isLoading, isRefetching, isSuccess, refetch } =
		useGetProfile(String(ownerId));

	const [showErrow, setShowError] = useState(isError);

	const {
		data: dataAvatar,
		isLoading: isLoadingAvatar,
		isSuccess: isSuccesSetAvatar,
		mutate,
	} = useSetProfileAvatar(refetch);

	const handleErrorClose = () => {
		setShowError(false);
	};

	const handleChangeAvatar = (event: ChangeEvent<HTMLInputElement>) => {
		if (event.currentTarget.files && event.currentTarget.files.length) {
			const [photo] = event.currentTarget.files;
			mutate(photo);
		}
	};

	return (
		<div className={styles.profileContainer}>
			{(isLoading || isLoadingAvatar) && <Loader />}
			{isSuccess && (
				<>
					{isLoadingAvatar ? (
						<Loader />
					) : (
						<div className={styles.avatarContainer}>
							{data.photos.large ? (
								<Avatar
									alt={`${data.fullName}`}
									src={data.photos.large}
									sx={{ width: 250, height: 250, bgcolor: deepPurple[800] }}
								/>
							) : (
								<DefaultAvatar />
							)}
							<UploadAvatar
								onChange={handleChangeAvatar}
								disable={isFetching || isLoading || isRefetching}
							/>
						</div>
					)}
					<div>{data.fullName}</div>
					<div>{data.aboutMe}</div>
					<div>{data.lookingForAJobDescription}</div>
					<div>{data.contacts.facebook}</div>
					<div>{data.contacts.website}</div>
					<div>{data.contacts.vk}</div>
					<div>{data.contacts.twitter}</div>
					<div>{data.contacts.instagram}</div>
					<div>{data.contacts.youtube}</div>
					<div>{data.contacts.github}</div>
					<div>{data.contacts.mainLink}</div>
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
					<span className={styles.profileError}>{error?.message}</span>
				</Alert>
			</Snackbar>
		</div>
	);
};
