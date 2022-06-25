import { sendMessage } from '@/features/chat/chatSlice';
import { useAppDispatch } from '@/hooks/storeHooks';
import { Button, TextareaAutosize } from '@mui/material';
import { FC, SyntheticEvent, useState } from 'react';

export const AddMessageForm: FC = () => {
	const dispatch = useAppDispatch();

	const [message, setMessage] = useState('');

	const handleChangeMessage = (event: SyntheticEvent<HTMLTextAreaElement>) => {
		const newMessage = event.currentTarget.value;
		setMessage(newMessage);
	};

	const handleSendMessage = () => {
		if (!message) {
			return;
		}
		dispatch(sendMessage(message));
		setMessage('');
	};

	return (
		<div>
			<TextareaAutosize value={message} onChange={handleChangeMessage} />
			<Button onClick={handleSendMessage}>Send new Message</Button>
		</div>
	);
};
