import { CONNECTION_STATUS } from '~/constants/systemConstants';
import { EVENT } from '~/constants/systemConstants';

export interface ChatMessageApi {
	message: string;
	photo: string;
	userId: number;
	userName: string;
}

export interface ChatMessage extends ChatMessageApi {
	id: number;
}

export type ChatMessages = Array<ChatMessage>;

export type ConnectionStatus = keyof typeof CONNECTION_STATUS;
export interface ChatSlice {
	messages: ChatMessages;
	status: ConnectionStatus;
}

export type Event = keyof typeof EVENT;

export interface Message {
	message: string;
	photo: string;
	userId: number;
	userName: string;
}

export type MessagesType = Array<Message>;

export type MessagesReceived = (messages: MessagesType) => void;
export type MessagesReceivedSubscribers = Array<MessagesReceived>;

export type StatusChanged = (status: ConnectionStatus) => void;
export type StatusChangedSubscribers = Array<StatusChanged>;

export type SubscriberCallBack = MessagesReceived | StatusChanged;
