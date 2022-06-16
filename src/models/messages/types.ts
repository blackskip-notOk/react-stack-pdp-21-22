export interface Message {
	message: string;
	photo: string;
	userId: number;
	userName: string;
}

export type MessagesType = Array<Message>;
