import { Suspense, useEffect } from 'react'
import './App.css'
import appStyles from './styles/App.module.css';
import 'antd/dist/antd.css';
import { useStore } from 'effector-react';
import { $inizialize, inizialize } from './effector/initialStore/InitialStore';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { fetchInizialize } from './api/loginApi/LoginApi';
import { RESPONSE_STATUSES, RESULT_CODES } from './constants/systemConstants';
import { NAVLINKS } from './constants/routerConstants';
import { Loader } from './components/common/loader/Loader';
import { Header } from './components/Header/Header';
import { NavBar } from './components/NavBar/NavBar';
import { Home } from './components/Home/Home';
import { Login } from './components/Login/Login';
import { Messages } from './components/Messages/Messages';
import { NotFound } from './components/NotFoundPage/NotFound';
import { Profile } from './components/Profile/Profile';


export const App = () => {
	const inizialized = useStore($inizialize);
	const navigate = useNavigate();

	useEffect(() => {
		fetchInizialize()
			.then((authResponse) => {
				if (authResponse.status === RESPONSE_STATUSES.success) {
					const { authInfo } = authResponse;

					if (authInfo.resultCode === RESULT_CODES.error) {
						inizialize({ inizialized: false, message: authInfo.messages[0] });
					}
					if (authInfo.resultCode === RESULT_CODES.success) {
						inizialize({ inizialized: true, message: authInfo.messages[0] });
					}
				}
			})
			.catch((error) => {
				console.error(error);
				inizialize({ inizialized: false, message: `${error}` });
			})
			.finally(() => {
				if (!inizialized.inizialized) {
					navigate(NAVLINKS.LOGIN);
				}
			});
	}, []);

	return (
			<Suspense fallback={<Loader />}>
				<div className={appStyles.appWrapper}>
					<div className={appStyles.headerWrapper}>
						<Header />
					</div>
					<div className={appStyles.navBarWrapper}>
						<NavBar />
					</div>
					<div className={appStyles.contentWrapper}>
						<Routes>
							<Route path={NAVLINKS.HOME} element={<Home />} />
							<Route path={NAVLINKS.LOGIN} element={<Login />} />
							<Route path={NAVLINKS.PROFILE} element={<Profile />} />
							<Route path={NAVLINKS.MESSAGES} element={<Messages />} />
							<Route path='*' element={<NotFound />} />
						</Routes>
					</div>
					<div className={appStyles.footerWrapper}>Footer</div>
				</div>
			</Suspense>
	);
};