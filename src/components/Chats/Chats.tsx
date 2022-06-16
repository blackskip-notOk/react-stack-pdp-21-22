import { FC } from 'react';
import { Chat } from '../Chat/Chat';
import styles from './Chats.module.less';

export const Chats: FC = () => {
	return (
		<div className={styles.chatsContainer}>
			<div>AllChats</div>
			<Chat />
		</div>
	);
};
