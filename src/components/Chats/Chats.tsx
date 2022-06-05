import { FC } from 'react';
import styles from './Chats.module.less';

export const Chats: FC = () => {
	return (
		<div className={styles.chatsContainer}>
			<div>AllChats</div>
			<div>Chat</div>
		</div>
	);
};
