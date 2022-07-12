import { CONNECTION_STATUS } from '@/constants/systemConstants';
import { sendMessage } from '@/store/slices/chatSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHooks';
import { Button, TextareaAutosize } from '@mui/material';
import { FC, SyntheticEvent, useState } from 'react';

export const AddMessageForm: FC = () => {
	const dispatch = useAppDispatch();
	const connectionStatus = useAppSelector((state) => state.chat.status);

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
			<Button disabled={connectionStatus !== CONNECTION_STATUS.ready} onClick={handleSendMessage}>
				Send new Message
			</Button>
		</div>
	);
};
