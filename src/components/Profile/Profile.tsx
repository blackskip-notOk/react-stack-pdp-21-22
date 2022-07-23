import { Alert, Avatar, Box, Slide, Snackbar, TextField } from '@mui/material';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { ERROR_MESSAGE_DURATION } from '@/constants/systemConstants';
import styles from './Profile.module.less';
import { Loader } from '../common/loader/Loader';
import { DefaultAvatar } from '../common/avatar/avatar';
import { deepPurple } from '@mui/material/colors';
import { UploadAvatar } from '../common/avatar/uploadAvatar';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { profileStatusSchema } from './utils/profileSchema';
import inputStyles from '@/styles/Input.module.less';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHooks';
import { isAuthSelector, isOwnerIdSelector } from '@/store/selectors/authSelectors';
import {
	useFetchProfileQuery,
	useFetchProfileStatusQuery,
	useSetProfileAvatarMutation,
	useSetProfileStatusMutation,
} from '@/store/slices/apiSlice';
import { setProfileAvatar, setProfileData } from '@/store/slices/profileSlice';
import {
	profileAvatarSelector,
	profileSelector,
	profileStatusSelector,
} from '@/store/selectors/profileSelector';
import { ProfileStatusState } from '@/store/slices/profileSlice/types';
import { setProfileStatus } from '@/store/slices/profileSlice/status';
import { miniSerializeError } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import { NAVLINKS } from '@/constants/routerConstants';

export const Profile: FC = () => {
	const navigate = useNavigate();

	const dispatch = useAppDispatch();

	const isAuth = useAppSelector(isAuthSelector);

	const ownerId = useAppSelector(isOwnerIdSelector);
	const { contacts, aboutMe, fullName, lookingForAJobDescription } =
		useAppSelector(profileSelector);

	const { status } = useAppSelector(profileStatusSelector);
	const { large } = useAppSelector(profileAvatarSelector);

	const {
		isFetching: profileFetching,
		isLoading: profileLoading,
		isSuccess: profileSuccess,
		isError: isProfileError,
		data: profileData,
		error: profileError,
	} = useFetchProfileQuery(ownerId, {
		skip: !ownerId,
	});

	const { data: profileStatus } = useFetchProfileStatusQuery(ownerId, {
		skip: !ownerId,
	});

	const [setStatus] = useSetProfileStatusMutation();

	const [setAvatar, { isLoading: loaadingAvatar, data: avatarData }] =
		useSetProfileAvatarMutation();

	const [showErrow, setShowError] = useState(isProfileError);

	useEffect(() => {
		if (!isAuth) {
			navigate(`${NAVLINKS.HOME}${NAVLINKS.LOGIN}`, { replace: true });
		}
	}, [isAuth]);

	useEffect(() => {
		if (profileData) {
			dispatch(setProfileData(profileData));
		}
	}, [profileData]);

	useEffect(() => {
		if (profileStatus) {
			dispatch(setProfileStatus(profileStatus));
		}
	}, [profileStatus]);

	useEffect(() => {
		if (avatarData) {
			dispatch(setProfileAvatar(avatarData));
		}
	}, [avatarData]);

	const handleErrorClose = () => {
		setShowError(false);
	};

	const {
		control,
		handleSubmit,
		formState: { errors },
		resetField,
	} = useForm<ProfileStatusState>({
		defaultValues: { status },
		resolver: yupResolver(profileStatusSchema),
	});

	const onSubmit: SubmitHandler<ProfileStatusState> = async (data) => {
		await setStatus(data.status).unwrap();
		resetField('status');
	};

	const handleChangeAvatar = (event: ChangeEvent<HTMLInputElement>) => {
		if (!event.currentTarget.files) {
			return;
		}

		if (event.currentTarget.files && event.currentTarget.files.length) {
			const [photo] = event.currentTarget.files;

			const formData = new FormData();
			formData.append('image', photo);
			setAvatar(formData);
		}
	};

	return (
		<div className={styles.profileContainer}>
			{(profileFetching || profileLoading || loaadingAvatar) && <Loader />}
			{profileSuccess && (
				<>
					{loaadingAvatar ? (
						<Loader />
					) : (
						<div className={styles.avatarContainer}>
							{large ? (
								<Avatar
									alt={`${fullName}`}
									src={large}
									sx={{ width: 250, height: 250, bgcolor: deepPurple[800] }}
								/>
							) : (
								<DefaultAvatar />
							)}
							<UploadAvatar
								onChange={handleChangeAvatar}
								disable={profileFetching || profileLoading || loaadingAvatar}
							/>
						</div>
					)}
					<div>{fullName}</div>
					<form onSubmit={handleSubmit(onSubmit)}>
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
					</form>

					<div>{status}</div>
					<div>{aboutMe}</div>
					<div>{lookingForAJobDescription}</div>
					<div>{contacts.facebook}</div>
					<div>{contacts.website}</div>
					<div>{contacts.vk}</div>
					<div>{contacts.twitter}</div>
					<div>{contacts.instagram}</div>
					<div>{contacts.youtube}</div>
					<div>{contacts.github}</div>
					<div>{contacts.mainLink}</div>
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
					<span className={styles.profileError}>{miniSerializeError(profileError)?.message}</span>
				</Alert>
			</Snackbar>
		</div>
	);
};
