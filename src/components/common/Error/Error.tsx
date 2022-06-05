import { FC } from 'react';
import { ErrorMessageProps } from './types';

export const ErrorMessage: FC<ErrorMessageProps> = ({ error }) => {
	return (
		<div role='alert'>
			{error.name && <div>{error.name}</div>}
			<pre>{error.message}</pre>
		</div>
	);
};
