import {
	Avatar,
	FormControlLabel,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Switch,
} from '@mui/material';
import { FC, useState } from 'react';
import { DefaultAvatar } from '../common/avatar/avatar';
import { UserProps } from './types';

export const User: FC<UserProps> = ({ user }) => {
	const { name, photos, status, followed } = user;

	const [checked, setChecked] = useState(false);

	const handleChange = () => {
		setChecked(!checked);
	};

	return (
		<ListItem
			secondaryAction={
				<FormControlLabel
					control={<Switch defaultChecked={followed} onChange={handleChange} color='secondary' />}
					label={followed ? 'Удалить из друзей' : 'Добавить в друзья'}
				/>
			}
		>
			<ListItemAvatar>
				{photos.small ? <Avatar alt='user avatar' src={photos.small} /> : <DefaultAvatar />}
			</ListItemAvatar>
			<ListItemText>{name}</ListItemText>
			<ListItemText>{status}</ListItemText>
		</ListItem>
	);
};
