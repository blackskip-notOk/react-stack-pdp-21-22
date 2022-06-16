import { Avatar } from '@mui/material';
import { FC } from 'react';
import { DefaultAvatar } from '../common/avatar/avatar';
import { MessageProps } from './types';

export const Message: FC<MessageProps> = ({ item }) => {
	const { message, photo, userName } = item;

	return (
		<div>
			{photo ? <Avatar alt='user avatar' src={photo} /> : <DefaultAvatar />}
			{userName}
			{message}
		</div>
	);
};
