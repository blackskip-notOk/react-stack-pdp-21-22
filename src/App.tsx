import { Suspense, useEffect } from 'react';
import './App.css';
import appStyles from './styles/App.module.less';
import { useStore } from 'effector-react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { NAVLINKS } from './constants/routerConstants';
import { Loader } from './components/common/loader/Loader';
import { Header } from './components/Header/Header';
import { NavBar } from './components/NavBar/NavBar';
import { Home } from './components/Home/Home';
import { Login } from './components/Login/Login';
import { Messages } from './components/Messages/Messages';
import { NotFound } from './components/NotFoundPage/NotFound';
import { Profile } from './components/Profile/Profile';
import { $auth, authFx } from './models/auth';

export const App = () => {
	const { isAuth } = useStore($auth);

	const navigate = useNavigate();

	useEffect(() => {
		authFx();
		if (!isAuth) {
			navigate(NAVLINKS.LOGIN);
		}
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<Suspense fallback={<Loader />}>
			<div className={appStyles.appWrapper}>
				<header className={appStyles.headerWrapper}>
					<Header />
				</header>
				<nav className={appStyles.navBarWrapper}>
					<NavBar />
				</nav>
				<main className={appStyles.contentWrapper}>
					<Routes>
						<Route path={NAVLINKS.HOME} element={<Home />} />
						<Route path={NAVLINKS.LOGIN} element={<Login />} />
						<Route path={NAVLINKS.PROFILE} element={<Profile />} />
						<Route path={NAVLINKS.MESSAGES} element={<Messages />} />
						<Route path='*' element={<NotFound />} />
					</Routes>
				</main>
				<footer className={appStyles.footerWrapper}>Footer</footer>
			</div>
		</Suspense>
	);
};
