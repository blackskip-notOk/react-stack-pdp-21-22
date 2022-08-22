import { FC } from 'react';
import styles from './Loader.module.css';

export const Loader: FC = () => <div className={styles.loader} data-testid='suspense-loader'></div>;
