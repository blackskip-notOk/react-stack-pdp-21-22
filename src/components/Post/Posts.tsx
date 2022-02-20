import { FC } from 'react';
import { Post } from './Post';

export const Posts: FC = () => {
	return (
		<>
			<textarea aria-label='empty textarea' placeholder='Add Post' />
			<button>Send</button>
			<Post />
		</>
	);
};
