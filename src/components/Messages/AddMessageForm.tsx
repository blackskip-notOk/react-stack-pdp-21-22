import { Button, TextareaAutosize } from '@mui/material';
import {
	FC,
	MouseEventHandler,
	SyntheticEvent,
	ChangeEventHandler,
	useState,
	useEffect,
} from 'react';
import { AddMessageFormProps } from './types';

export const AddMessageForm: FC<AddMessageFormProps> = ({ webSocket }) => {
	const [message, setMessage] = useState('');
	const [webSocketStatus, setWebSocketStatus] = useState<'pending' | 'ready'>('pending');

	useEffect(() => {
		const handleOpenConnection = () => {
			console.info('WebSocket connection is opened');
			setWebSocketStatus('ready');
		};

		if (webSocket) {
			webSocket.addEventListener('open', handleOpenConnection);
		}

		return () => {
			webSocket?.removeEventListener('close', handleOpenConnection);
		};
	}, [webSocket]);

	const handleChangeMessage = (event: SyntheticEvent<HTMLTextAreaElement>) => {
		const newMessage = event.currentTarget.value;
		setMessage(newMessage);
	};

	const handleSendMessage = () => {
		if (!message) {
			return;
		}

		if (webSocket) {
			webSocket?.send(message);
			setMessage('');
		}
	};

	return (
		<div>
			<TextareaAutosize value={message} onChange={handleChangeMessage} />
			<Button disabled={!webSocket || webSocketStatus !== 'ready'} onClick={handleSendMessage}>
				Send new Message
			</Button>
		</div>
	);
};
