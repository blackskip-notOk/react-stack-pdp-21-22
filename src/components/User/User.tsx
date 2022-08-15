import { useFollowUserMutation, useUnFollowUserMutation } from '~/store/slices/apiSlice';
import { getFollowResult } from '~/utils';
import {
	Avatar,
	FormControlLabel,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Switch,
} from '@mui/material';
import { ChangeEvent, FC, Suspense, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { DefaultAvatar } from '../common/avatar/avatar';
import { Loader } from '../common/loader/Loader';
import { Message } from '../common/Message/Message';
import { Variant } from '../common/Message/types';
import { UserProps } from './types';

export const User: FC<UserProps> = ({ user }) => {
	const { id, name, photos, status, followed } = user;

	const [follow, { data: followData, isLoading: followLoading, isSuccess: followSuccess }] =
		useFollowUserMutation();
	const [unFollow, { data: unFollowData, isLoading: unFollowLoading, isSuccess: unFollowSuccess }] =
		useUnFollowUserMutation();

	const [checked, setChecked] = useState(false);
	const [isShowMessage, setIsShowMessage] = useState(false);
	const [result, setResult] = useState({ message: '', variant: Variant.success });

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setChecked(event.currentTarget.checked);
		event.currentTarget.checked ? follow(id) : unFollow(id);
	};

	useEffect(() => {
		if ((followData && followSuccess) || (unFollowData && unFollowSuccess)) {
			const data = followData ? followData : unFollowData;

			const { isSuccess, message } = getFollowResult(data, name, checked);
			setIsShowMessage(true);
			setResult({ message, variant: isSuccess ? Variant.success : Variant.error });
		}
	}, [followSuccess, followData, unFollowData, unFollowSuccess]);

	useEffect(() => {
		if (unFollowData && unFollowSuccess) {
			const { isSuccess, message } = getFollowResult(unFollowData, name, checked);
			setIsShowMessage(true);
			setResult({ message, variant: isSuccess ? Variant.success : Variant.error });
		}
	}, [unFollowSuccess, unFollowData]);

	return (
		<Suspense fallback={<Loader />}>
			<ListItem
				secondaryAction={
					<FormControlLabel
						control={
							<Switch
								defaultChecked={followed}
								onChange={handleChange}
								disabled={followLoading || unFollowLoading}
								color='secondary'
								value={checked}
							/>
						}
						label={followed ? 'Удалить из друзей' : 'Добавить в друзья'}
					/>
				}
			>
				<NavLink to={`${id}`}>
					<ListItemAvatar>
						{photos.small ? <Avatar alt='user avatar' src={photos.small} /> : <DefaultAvatar />}
					</ListItemAvatar>
					<ListItemText>{name}</ListItemText>
				</NavLink>
				<ListItemText>{status}</ListItemText>
			</ListItem>
			{(followData || unFollowData) && (
				<Message
					open={isShowMessage}
					message={result.message}
					variant={result.variant}
					setIsOpen={setIsShowMessage}
				/>
			)}
		</Suspense>
	);
};
