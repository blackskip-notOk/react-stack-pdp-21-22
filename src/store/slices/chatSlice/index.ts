import { CONNECTION_STATUS, EVENT } from '@/constants/systemConstants';
import { AppDispatch } from '@/store/store';
import { chatApi } from './chatApi';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChatMessage, ChatMessages, ChatSlice, ConnectionStatus } from './types';
import { idGenerator } from '@/utils';

let newMessagesHandler: ((messages: ChatMessages) => void) | null = null;
let statusChangedHandler: ((status: ConnectionStatus) => void) | null = null;

const it = idGenerator();

const initialState: ChatSlice = {
	messages: [] as ChatMessages,
	status: CONNECTION_STATUS.pending as ConnectionStatus,
};

export const chatSlice = createSlice({
	name: 'chat',
	initialState,
	reducers: {
		messagesReceived: (state, action: PayloadAction<ChatMessages>) => {
			const newMessages = action.payload.map((message) => {
				const id = it.next().value as number;
				return { ...message, id };
			});

			state.messages = [...state.messages, ...newMessages].filter(
				(_, index, array) => index >= array.length - 100,
			);
		},
		addMessage: (state, action: PayloadAction<ChatMessage>) => {
			state.messages.push(action.payload);
		},
		statusChanged: (state, action: PayloadAction<ConnectionStatus>) => {
			state.status = action.payload;
		},
	},
});

export const { addMessage, messagesReceived, statusChanged } = chatSlice.actions;

const newMessagesHandlerCreator = (dispatch: AppDispatch) => {
	if (!newMessagesHandler) {
		newMessagesHandler = (messages) => {
			dispatch(messagesReceived(messages));
		};
	}
	return newMessagesHandler;
};

const statusChangedHandlerCreator = (dispatch: AppDispatch) => {
	if (!statusChangedHandler) {
		statusChangedHandler = (status) => {
			dispatch(statusChanged(status));
		};
	}
	return statusChangedHandler;
};

export const startListeningMessages = () => async (dispatch: AppDispatch) => {
	chatApi.createChannel();
	chatApi.subscribe(EVENT.message, newMessagesHandlerCreator(dispatch));
	chatApi.subscribe(EVENT.status, statusChangedHandlerCreator(dispatch));
};

export const stopListeningMessages = () => async (dispatch: AppDispatch) => {
	chatApi.unsubscibe(EVENT.message, newMessagesHandlerCreator(dispatch));
	chatApi.unsubscibe(EVENT.status, statusChangedHandlerCreator(dispatch));
	chatApi.killChanel();
};

export const sendMessage = (message: string) => async () => {
	chatApi.sendMessage(message);
};

export default chatSlice.reducer;
