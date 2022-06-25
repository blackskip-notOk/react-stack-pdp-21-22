import { useAppSelector } from '@/hooks/storeHooks';
import { idGenerator } from '@/utils';
import { FC } from 'react';
import { Message } from '../Message/Message';
import styles from './Messages.module.less';

export const Messages: FC = () => {
	const messages = useAppSelector((state) => state.chat.messages);

	const it = idGenerator();

	const message = messages.map((message) => {
		const id = it.next().value as number;

		return <Message key={id} item={message} />;
	});

	return <div className={styles.messagesContainer}>{message}</div>;
};
