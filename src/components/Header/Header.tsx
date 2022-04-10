import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { NAVLINKS } from '../../constants/routerConstants';
import logo from '../../image/React-icon.svg.png';
import styles from './Header.module.css';

export const Header: FC = () => {
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		event.preventDefault();
		console.info('Breadcrumb click');
	};

	return (
		<div role='presentation' onClick={handleClick}>
			<img src={logo} alt='react-logo' className={styles.logo} />
			<div>
				<NavLink to={`${NAVLINKS.PROFILE}`}>Profile</NavLink>
				<NavLink to={`${NAVLINKS.LOGIN}`}>Login</NavLink>
			</div>
		</div>
	);
};
