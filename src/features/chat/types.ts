export interface ChatMessage {
	message: string;
	photo: string;
	userId: number;
	userName: string;
}

export type ChatMessages = Array<ChatMessage>;

export interface ChatSlice {
	messages: ChatMessages;
}
