import { API } from '@/constants/apiConstants';
import { MessagesType } from '@/models/messages/types';
export type Subscriber = (messages: MessagesType) => void;

let subscribers = [] as Array<Subscriber>;
let ws: WebSocket | null = null;

const handleCloseConnection = () => {
	console.info('WebSocket connection is closed');
	createWebSocket();
};

const handleReceiveMessages = (event: MessageEvent) => {
	const { data } = event;
	const newMessages = JSON.parse(data);
	subscribers.forEach((s) => s(newMessages));
};

function createWebSocket() {
	if (ws) {
		ws.removeEventListener('close', handleCloseConnection);
	}

	ws = new WebSocket(API.baseWebSocketUrl);
	ws.addEventListener('close', handleCloseConnection);
	ws.addEventListener('message', handleReceiveMessages);
}

export const chatApi = {
	createChannel() {
		createWebSocket();
	},
	killChanel() {
		subscribers = [];
		ws?.removeEventListener('close', handleCloseConnection);
		ws?.removeEventListener('message', handleReceiveMessages);
		ws?.close();
	},
	subscribe(callback: Subscriber) {
		subscribers.push(callback);
		return () => {
			subscribers = subscribers.filter((s) => s !== callback);
		};
	},
	unsubscibe(callback: Subscriber) {
		subscribers = subscribers.filter((s) => s !== callback);
	},
	sendMessage(message: string) {
		ws?.send(message);
	},
};
