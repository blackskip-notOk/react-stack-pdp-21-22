import { createEvent, createStore } from 'effector';
import { MessagesType } from './types';

export interface Message {
	message: string;
	photo: string;
	userId: number;
	userName: string;
}

const defaultMessagesStore = [] as MessagesType;

export const $messages = createStore<MessagesType>(defaultMessagesStore, {
	name: 'messagesStore',
});

export const setMessages = createEvent<MessagesType>();
export const unSetMessages = createEvent<MessagesType>();
