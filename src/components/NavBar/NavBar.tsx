import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { NAVLINKS } from '@/constants/routerConstants';
import { useAppSelector } from '@/hooks/storeHooks';
import { isAuthSelector } from '@/store/selectors/authSelectors';

export const NavBar: FC = () => {
	const isAuth = useAppSelector(isAuthSelector);

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
