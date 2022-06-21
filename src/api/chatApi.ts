import { API } from '@/constants/apiConstants';
import { MessagesType } from '@/models/messages/types';
import { useEffect } from 'react';
import { useQueryClient } from 'react-query';

export const useWebSocketSubscription = () => {
	const queryClient = useQueryClient();

	useEffect(() => {
		const webSocket = new WebSocket(API.baseWebSocketUrl);

		webSocket.onopen = () => {
			console.log('connected');
		};

		webSocket.onmessage = (event: MessageEvent) => {
			const data = JSON.parse(event.data) as MessagesType;

			const queryKey = [...data];

			queryClient.invalidateQueries(queryKey);
		};

		return () => {
			webSocket.close();
		};
	}, []);
};

export let webSocket: WebSocket;

export const createWebSocket = () => {
	webSocket = new WebSocket(API.baseWebSocketUrl);
};
