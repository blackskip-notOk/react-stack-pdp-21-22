import { Alert, Avatar, Box, Slide, Snackbar, TextField } from '@mui/material';
import { ChangeEvent, FC, useState } from 'react';
import { ERROR_MESSAGE_DURATION } from '@/constants/systemConstants';
import styles from './Profile.module.less';
import { Loader } from '../common/loader/Loader';
import {
	useGetProfile,
	useGetProfileStatus,
	useSetProfileAvatar,
	useSetProfileStatus,
} from '@/api/profileApi';
import { DefaultAvatar } from '../common/avatar/avatar';
import { deepPurple } from '@mui/material/colors';
import { UploadAvatar } from '../common/avatar/uploadAvatar';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { ProfileStatusFormData } from '@/models/profile/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { profileStatusSchema } from './utils/profileSchema';
import inputStyles from '@/styles/Input.module.less';
import { useAppSelector } from '@/hooks/storeHooks';
import { getOwnerId } from '@/store/selectors/authSelectors';

export const Profile: FC = () => {
	const ownerId = useAppSelector(getOwnerId);

	const { data, error, isError, isFetching, isLoading, isRefetching, isSuccess, refetch } =
		useGetProfile(String(ownerId));

	// const { data: profileStatus, refetch: refetchStatus } = useGetProfileStatus(ownerId);

	const [showErrow, setShowError] = useState(isError);

	const { isLoading: isLoadingAvatar, mutate } = useSetProfileAvatar(refetch);

	// const { mutate: setStatus } = useSetProfileStatus(refetchStatus);

	const handleErrorClose = () => {
		setShowError(false);
	};

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<ProfileStatusFormData>({
		// defaultValues: {
		// 	status: profileStatus,
		// },
		resolver: yupResolver(profileStatusSchema),
	});

	// const onSubmit: SubmitHandler<ProfileStatusFormData> = (data) => setStatus(data.status);

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
					{/* <form onSubmit={handleSubmit(onSubmit)}>
						<Controller
							name='status'
							control={control}
							render={({ field }) => (
								<Box className={inputStyles.container}>
									<TextField
										{...field}
										id='status'
										label='Status'
										variant='outlined'
										helperText={errors.status?.message ?? ' '}
										error={!!errors.status}
										fullWidth
										color='success'
										margin='normal'
										focused
										placeholder='enter your status'
									/>
								</Box>
							)}
						/>
					</form> */}

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
