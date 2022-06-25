import { AppDispatch } from '@/store/store';
import { chatApi } from '@/api/chatApi';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChatMessage, ChatMessages, ChatSlice } from './types';

const initialState: ChatSlice = {
	messages: [] as ChatMessages,
};

export const chatSlice = createSlice({
	name: 'chat',
	initialState,
	reducers: {
		messagesReceived: (state, action: PayloadAction<ChatMessages>) => {
			state.messages = [...state.messages, ...action.payload];
		},
		addMessage: (state, action: PayloadAction<ChatMessage>) => {
			state.messages.push(action.payload);
		},
	},
});

export const { addMessage, messagesReceived } = chatSlice.actions;

let newMessagesHandler: ((messages: ChatMessages) => void) | null = null;

const newMessagesHandlerCreator = (dispatch: AppDispatch) => {
	if (!newMessagesHandler) {
		newMessagesHandler = (messages) => {
			dispatch(messagesReceived(messages));
		};
	}
	return newMessagesHandler;
};

export const startListeningMessages = () => async (dispatch: AppDispatch) => {
	chatApi.createChannel();
	chatApi.subscribe(newMessagesHandlerCreator(dispatch));
};

export const stopListeningMessages = () => async (dispatch: AppDispatch) => {
	chatApi.unsubscibe(newMessagesHandlerCreator(dispatch));
	chatApi.killChanel();
};

export const sendMessage = (message: string) => async () => {
	chatApi.sendMessage(message);
};

export default chatSlice.reducer;
