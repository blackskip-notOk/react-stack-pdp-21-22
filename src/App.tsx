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
import { $auth, $authLoading, authFx } from './models/auth';
import { SESSION_STORAGE } from './constants/systemConstants';

const Profile = lazy(() =>
	import('./components/Profile/Profile').then((module) => ({ default: module.Profile })),
);

const Messages = lazy(() =>
	import('./components/Messages/Messages').then((module) => ({ default: module.Messages })),
);

const NotFound = lazy(() =>
	import('./components/NotFoundPage/NotFound').then((module) => ({ default: module.NotFound })),
);

const Users = lazy(() =>
	import('./components/Users/Users').then((module) => ({ default: module.Users })),
);

export const App = () => {
	const navigate = useNavigate();

	const sessionLocation = sessionStorage.getItem(SESSION_STORAGE.LOCATION);

	const { isAuth } = useStore($auth);
	const isAuthLoading = useStore($authLoading);

	const [showGreeting, setShowGreeting] = useState(false);

	useEffect(() => {
		authFx();
		if (!isAuth) {
			navigate(NAVLINKS.LOGIN);
		}
		if (sessionLocation) {
			navigate(sessionLocation);
		}
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	if (isAuthLoading) {
		return <Loader />;
	}

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
						<Route
							path={NAVLINKS.PROFILE}
							element={
								<Suspense fallback={<Loader />}>
									<Profile />
								</Suspense>
							}
						/>
						<Route
							path={NAVLINKS.MESSAGES}
							element={
								<Suspense fallback={<Loader />}>
									<Messages />
								</Suspense>
							}
						/>
						<Route
							path={NAVLINKS.USERS}
							element={
								<Suspense fallback={<Loader />}>
									<Users />
								</Suspense>
							}
						/>
						<Route
							path='*'
							element={
								<Suspense fallback={<Loader />}>
									<NotFound />
								</Suspense>
							}
						/>
					</Routes>
				</main>
				{isAuth && <footer className={appStyles.footerWrapper}>Footer</footer>}
			</div>
		</Suspense>
	);
};
