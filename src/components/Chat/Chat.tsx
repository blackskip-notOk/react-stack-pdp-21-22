import { $messages, setMessages } from '@/models/messages';
import { useStore } from 'effector-react';
import { FC, useEffect } from 'react';
import { AddMessageForm } from '../Messages/AddMessageForm';
import { Messages } from '../Messages/Messages';

const ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');

export const Chat: FC = () => {
	return (
		<div>
			<Messages channel={ws} />
			<AddMessageForm channel={ws} />
		</div>
	);
};
