import { Avatar } from '@mui/material';
import { FC, memo } from 'react';
import { DefaultAvatar } from '../common/avatar/avatar';
import { MessageProps } from './types';

export const Message: FC<MessageProps> = memo(({ item }) => {
	const { message, photo, userName } = item;

	return (
		<div>
			{photo ? <Avatar alt='user avatar' src={photo} /> : <DefaultAvatar />}
			{userName}
			{message}
		</div>
	);
});
