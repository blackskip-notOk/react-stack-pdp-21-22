import { useAppSelector } from '@/hooks/storeHooks';
import { FC, useEffect, useRef, useState } from 'react';
import { Message } from '../Message/Message';
import styles from './Messages.module.less';

export const Messages: FC = () => {
	const messages = useAppSelector((state) => state.chat.messages);

	const anchorRef = useRef<HTMLDivElement>(null);

	const [autoScroll, setAutoScroll] = useState(false);

	useEffect(() => {
		if (anchorRef.current && autoScroll) {
			anchorRef.current.scrollIntoView({ behavior: 'smooth' });
		}
	}, [messages]);

	const message = messages.map((message) => {
		return <Message key={message.id} item={message} />;
	});

	const scrollHandler = (event: React.UIEvent<HTMLDivElement, UIEvent>) => {
		const element = event.currentTarget;
		if (Math.abs(element.scrollHeight - element.scrollTop - element.clientHeight) < 300) {
			setAutoScroll(true);
		} else {
			setAutoScroll(false);
		}
	};

	return (
		<div className={styles.messagesContainer} onScroll={scrollHandler}>
			{message}
			<div ref={anchorRef}></div>
		</div>
	);
};
