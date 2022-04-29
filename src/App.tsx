import { lazy, Suspense, useEffect, useState } from 'react';
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
import { NotFound } from './components/NotFoundPage/NotFound';
import { $auth, authFx } from './models/auth';
import { Profile } from './components/Profile/Profile';

const Messages = lazy(() =>
	import('./components/Messages/Messages').then((module) => ({ default: module.Messages })),
);

export const App = () => {
	const { isAuth } = useStore($auth);

	const navigate = useNavigate();

	const [showGreeting, setShowGreeting] = useState(false);

	useEffect(() => {
		authFx();
		if (!isAuth) {
			navigate(NAVLINKS.LOGIN);
		}
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<Suspense fallback={<Loader />}>
			<div className={appStyles.appWrapper}>
				{isAuth && (
					<header className={appStyles.headerWrapper}>
						<Header />
					</header>
				)}
				{isAuth && (
					<nav className={appStyles.navBarWrapper}>
						<NavBar />
					</nav>
				)}
				<main className={appStyles.contentWrapper}>
					<Routes>
						<Route
							path={NAVLINKS.HOME}
							element={<Home showGreeting={showGreeting} setShowGreeting={setShowGreeting} />}
						/>
						<Route path={NAVLINKS.LOGIN} element={<Login setShowGreeting={setShowGreeting} />} />
						<Route path={NAVLINKS.PROFILE} element={<Profile />} />
						<Route
							path={NAVLINKS.MESSAGES}
							element={
								<Suspense fallback={<Loader />}>
									<Messages />
								</Suspense>
							}
						/>
						<Route path='*' element={<NotFound />} />
					</Routes>
				</main>
				{isAuth && <footer className={appStyles.footerWrapper}>Footer</footer>}
			</div>
		</Suspense>
	);
};
