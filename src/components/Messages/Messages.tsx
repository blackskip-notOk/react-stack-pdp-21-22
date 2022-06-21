import { $messages, setMessages } from '@/models/messages';
import { MessagesType } from '@/models/messages/types';
import { idGenerator } from '@/utils';
import { useStore } from 'effector-react';
import { FC, useEffect, useState } from 'react';
import { Message } from '../Message/Message';
import styles from './Messages.module.less';
import { MessagesProps } from './types';

export const Messages: FC<MessagesProps> = ({ webSocket }) => {
	// const messages = useStore($messages);

	const [messages, setMessages] = useState<MessagesType>([]);

	// TODO make connection status flow

	useEffect(() => {
		const handleReceiveMessages = (event: MessageEvent) => {
			const { data } = event;
			const newMessages = JSON.parse(data);
			setMessages((prevMessages) => [...prevMessages, ...newMessages]);
		};

		if (webSocket) {
			webSocket.addEventListener('message', handleReceiveMessages);
		}

		return () => {
			webSocket?.removeEventListener('close', handleReceiveMessages);
		};
	}, [webSocket, messages]);

	const it = idGenerator();

	const message = messages.map((message) => {
		const id = it.next().value as number;

		return <Message key={id} item={message} />;
	});

	return <div className={styles.messagesContainer}>{message}</div>;
};
