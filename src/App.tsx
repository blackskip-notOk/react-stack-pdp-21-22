import { lazy, Suspense, useEffect, useState } from 'react';
import './App.css';
import appStyles from './styles/App.module.less';
import { useStore } from 'effector-react';
import { Route, Routes } from 'react-router-dom';
import { NAVLINKS } from './constants/routerConstants';
import { Loader } from './components/common/loader/Loader';
import { Header } from './components/Header/Header';
import { NavBar } from './components/NavBar/NavBar';
import { Home } from './components/Home/Home';
import { Login } from './components/Login/Login';
import { $auth, $initialization, initializeFx } from './models/auth';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorMessage } from './components/common/Error/Error';

const Profile = lazy(() =>
	import('./components/Profile/Profile').then((module) => ({ default: module.Profile })),
);

const Chats = lazy(() =>
	import('./components/Chats/Chats').then((module) => ({ default: module.Chats })),
);

const Chat = lazy(() =>
	import('./components/Chat/Chat').then((module) => ({ default: module.Chat })),
);

const NotFound = lazy(() =>
	import('./components/NotFoundPage/NotFound').then((module) => ({ default: module.NotFound })),
);

const Users = lazy(() =>
	import('./components/Users/Users').then((module) => ({ default: module.Users })),
);

const UserProfile = lazy(() =>
	import('./components/UserProfile/UserProfile').then((module) => ({
		default: module.UserProfile,
	})),
);

export const App = () => {
	const { isAuth } = useStore($auth);
	const initialization = useStore($initialization);

	const [showGreeting, setShowGreeting] = useState(false);

	useEffect(() => {
		initializeFx();
	}, [initializeFx]);

	if (!initialization.initialize) {
		return <Loader />;
	}

	return (
		<ErrorBoundary fallbackRender={({ error }) => <ErrorMessage error={error} />}>
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
								path={NAVLINKS.CHATS}
								element={
									<Suspense fallback={<Loader />}>
										<Chats />
									</Suspense>
								}
							>
								<Route
									path=':chatId'
									element={
										<Suspense fallback={<Loader />}>
											<Chat />
										</Suspense>
									}
								/>
							</Route>
							<Route path={`${NAVLINKS.USERS}/:userId`} element={<UserProfile />} />
							<Route
								path={NAVLINKS.USERS}
								element={
									<Suspense fallback={<Loader />}>
										<Users />
									</Suspense>
								}
							></Route>
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
		</ErrorBoundary>
	);
};
