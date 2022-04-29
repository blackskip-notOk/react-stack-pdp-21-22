import { useStore } from 'effector-react';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { $owner } from '@/models/auth';
import { NAVLINKS } from '@/constants/routerConstants';

export const NavBar: FC = () => {
	const { isOwner } = useStore($owner);

	return (
		<>
			{isOwner && (
				<div>
					<NavLink to={NAVLINKS.PROFILE}>Profile</NavLink>
				</div>
			)}
			{/* <NavLink to={`${NAVLINKS.LOGIN}`}>Login</NavLink> */}
			<NavLink to={`${NAVLINKS.MESSAGES}`}>Messages</NavLink>
		</>
	);
};
