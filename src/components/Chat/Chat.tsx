import { API } from '@/constants/apiConstants';
import { $messages, setMessages } from '@/models/messages';
import { useStore } from 'effector-react';
import { FC, useEffect, useState } from 'react';
import { AddMessageForm } from '../Messages/AddMessageForm';
import { Messages } from '../Messages/Messages';

export const Chat: FC = () => {
	const [webSocket, setWebSocket] = useState<WebSocket | null>(null);

	useEffect(() => {
		let ws: WebSocket;

		const handleCloseConnection = () => {
			console.info('WebSocket connection is closed');
			createWebSocket();
		};

		function createWebSocket() {
			if (ws) {
				ws.removeEventListener('close', handleCloseConnection);
			}

			ws = new WebSocket(API.baseWebSocketUrl);
			ws.addEventListener('close', handleCloseConnection);
			setWebSocket(ws);
		}

		createWebSocket();

		return () => {
			ws.removeEventListener('close', handleCloseConnection);
			ws.close();
		};
	}, []);

	useEffect(() => {
		if (webSocket) {
			webSocket.addEventListener('close', () => {
				console.info('WebSocket connection is closed');
			});
		}
	}, [webSocket]);

	return (
		<div>
			<Messages webSocket={webSocket} />
			<AddMessageForm webSocket={webSocket} />
		</div>
	);
};
