import { Button, TextareaAutosize } from '@mui/material';
import { FC, MouseEventHandler, SyntheticEvent, ChangeEventHandler, useState } from 'react';
import { AddMessageFormProps } from './types';

export const AddMessageForm: FC<AddMessageFormProps> = ({ channel }) => {
	const [message, setMessage] = useState('');

	const handleChangeMessage = (event: SyntheticEvent<HTMLTextAreaElement>) => {
		const newMessage = event.currentTarget.value;
		setMessage(newMessage);
	};

	const handleSendMessage = () => {
		if (!message) {
			return;
		}
		channel.send(message);

		setMessage('');
	};

	return (
		<div>
			<TextareaAutosize value={message} onChange={handleChangeMessage} />
			<Button disabled={channel.readyState !== WebSocket.OPEN} onClick={handleSendMessage}>
				Send new Message
			</Button>
		</div>
	);
};
