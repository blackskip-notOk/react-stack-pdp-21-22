import { FC } from 'react'
import { NavLink } from 'react-router-dom'
import { NAVLINKS } from '../../constants/routerConstants'

export const NavBar: FC = () => {
	return (
		<>
	<div><NavLink to={`${NAVLINKS.PROFILE}`}>Profile</NavLink></div>
	<NavLink to={`${NAVLINKS.LOGIN}`}>Login</NavLink>
	</>
	)
}
