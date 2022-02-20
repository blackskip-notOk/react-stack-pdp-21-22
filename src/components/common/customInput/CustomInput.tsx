import { FC } from 'react';
import { CustomInputProps } from './types';
import styles from './CustomInput.module.css';
import { Input } from 'antd';

export const CustomInput: FC = ({ fields }) => (
	<div className={styles.container}>
		{/* <label htmlFor={name}> */}
			{/* <span className={styles.labe}>{`${name}:`}</span> */}
		{/* </label> */}
		<Input {...fields} />
		{/* <input
			{...register(name)}
			type={type}
			placeholder={placeholder}
			autoComplete='on'
			className={styles.input}
		/> */}
	</div>
);
