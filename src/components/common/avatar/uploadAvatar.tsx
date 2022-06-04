import { Fab } from '@mui/material';
import { FC } from 'react';
import styles from './avatar.module.less';
import { UploadAvatarProps } from './types';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

export const UploadAvatar: FC<UploadAvatarProps> = ({ onChange, disable = false }) => {
	return (
		<div className={styles.uploadAvatarContainer}>
			<label htmlFor='uploadAvatar'>
				<input
					type='file'
					name='uploadAvatar'
					id='uploadAvatar'
					className={styles.inputAvatar}
					onChange={onChange}
				/>
				<Fab
					disabled={disable}
					component='span'
					color='secondary'
					size='small'
					aria-label='uploadAvatar'
					variant='circular'
				>
					<AddAPhotoIcon className={styles.addAvatarIcon} />
				</Fab>
			</label>
		</div>
	);
};
