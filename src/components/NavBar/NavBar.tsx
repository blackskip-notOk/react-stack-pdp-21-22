import { useStore } from 'effector-react';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { $owner } from '@/models/auth';
import { NAVLINKS } from '@/constants/routerConstants';

export const NavBar: FC = () => {
	const { isOwner } = useStore($owner);

	return (
		<>
			<NavLink to={`${NAVLINKS.HOME}`} end>
				Home
			</NavLink>
			{isOwner && (
				<div>
					<NavLink to={NAVLINKS.PROFILE}>Profile</NavLink>
				</div>
			)}
			<NavLink to={`${NAVLINKS.MESSAGES}`}>Messages</NavLink>
			<NavLink to={`${NAVLINKS.USERS}`}>Users</NavLink>
		</>
	);
};
