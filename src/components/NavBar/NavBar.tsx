import { useStore } from 'effector-react';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { $auth } from '@/models/auth';
import { NAVLINKS } from '@/constants/routerConstants';

export const NavBar: FC = () => {
	const { isAuth } = useStore($auth);

	return (
		<>
			<NavLink to={`${NAVLINKS.HOME}`} end>
				Home
			</NavLink>
			{isAuth && (
				<div>
					<NavLink to={NAVLINKS.PROFILE}>Profile</NavLink>
				</div>
			)}
			<NavLink to={`${NAVLINKS.CHATS}`}>Chats</NavLink>
			<NavLink to={`${NAVLINKS.USERS}`}>Users</NavLink>
		</>
	);
};
