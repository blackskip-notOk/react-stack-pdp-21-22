import { ChangeEvent } from 'react';

export interface UploadAvatarProps {
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
	disable?: boolean;
}
