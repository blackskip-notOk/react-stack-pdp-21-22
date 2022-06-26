import { ConnectionStatus } from '@/features/chat/types';
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { CONNECTION_STATUS, EVENT } from '@/constants/systemConstants';
import { MessagesReceivedSubscribers, StatusChangedSubscribers, SubscriberCallBack } from './types';
import { API } from '@/constants/apiConstants';

const subscribers = {
	'messages-received': [] as MessagesReceivedSubscribers,
	'status-changed': [] as StatusChangedSubscribers,
};

let ws: WebSocket | null = null;

const handleOpenConnection = () => {
	console.info('WebSocket connection is opened');
	statusNotification(CONNECTION_STATUS.ready);
};

const handleCloseConnection = () => {
	console.info('WebSocket connection is closed');
	statusNotification(CONNECTION_STATUS.pending);
	setTimeout(createWebSocket, 3000);
};

const handleErrorConnection = () => {
	console.error('WebSocket connection error');
	statusNotification(CONNECTION_STATUS.error);
};

const handleReceiveMessages = (event: MessageEvent) => {
	const { data } = event;
	const newMessages = JSON.parse(data);
	subscribers['messages-received'].forEach((s) => s(newMessages));
};

const cleanUp = () => {
	ws?.removeEventListener('close', handleCloseConnection);
	ws?.removeEventListener('message', handleReceiveMessages);
	ws?.removeEventListener('open', handleOpenConnection);
	ws?.removeEventListener('error', handleErrorConnection);
};

const statusNotification = (status: ConnectionStatus) => {
	subscribers['status-changed'].forEach((s) => s(status));
};

function createWebSocket() {
	if (ws) {
		cleanUp();
	}

	ws = new WebSocket(API.baseWebSocketUrl);
	statusNotification(CONNECTION_STATUS.pending);
	ws.addEventListener('close', handleCloseConnection);
	ws.addEventListener('message', handleReceiveMessages);
	ws.addEventListener('open', handleOpenConnection);
	ws.addEventListener('error', handleErrorConnection);
}

export const chatApi = {
	createChannel() {
		createWebSocket();
	},
	killChanel() {
		subscribers['messages-received'] = [];
		subscribers['status-changed'] = [];
		cleanUp();
		ws?.close();
	},
	subscribe(event: EVENT, callback: SubscriberCallBack) {
		// @ts-ignore
		subscribers[event].push(callback);
		return () => {
			// @ts-ignore
			subscribers[event] = subscribers[event].filter((s) => s !== callback);
		};
	},
	unsubscibe(event: EVENT, callback: SubscriberCallBack) {
		// @ts-ignore
		subscribers[event] = subscribers[event].filter((s) => s !== callback);
	},
	sendMessage(message: string) {
		ws?.send(message);
	},
};
