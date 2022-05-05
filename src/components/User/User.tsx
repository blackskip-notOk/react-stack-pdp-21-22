import { Avatar, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import { FC } from 'react';
import { DefaultAvatar } from '../common/avatar/avatar';
import { UserProps } from './types';

export const User: FC<UserProps> = ({ user }) => {
	const { name, photos, status } = user;

	return (
		<ListItem>
			<ListItemAvatar>
				{photos.small ? <Avatar alt='user avatar' src={photos.small} /> : <DefaultAvatar />}
			</ListItemAvatar>
			<ListItemText>{name}</ListItemText>
			<ListItemText>{status}</ListItemText>
		</ListItem>
	);
};
