import { SESSION_STORAGE } from '@/constants/systemConstants';
import {
	$users,
	$usersLoading,
	$usersRequestParams,
	getUsersFx,
	setUsersRequestParams,
} from '@/models/users';
import { InputAdornment, List, Stack, TablePagination, TextField } from '@mui/material';
import { useStore } from 'effector-react';
import { FC, useEffect, type MouseEvent, type ChangeEvent, useMemo, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Loader } from '../common/loader/Loader';
import { User } from '../User/User';
import styles from './Users.module.less';
import SearchIcon from '@mui/icons-material/Search';
import { fromEvent } from 'rxjs';

export const Users: FC = () => {
	const location = useLocation();

	const usersData = useStore($users);
	const requestParams = useStore($usersRequestParams);
	const isUsersLoading = useStore($usersLoading);

	const savedRequestParams = sessionStorage.getItem(SESSION_STORAGE.USERS_REQUEST_PARAMS);

	const currentParams = useMemo(
		() => (savedRequestParams ? JSON.parse(savedRequestParams) : { ...requestParams }),
		[savedRequestParams, requestParams],
	);

	const searchRef = useRef(null);

	useEffect(() => {
		sessionStorage.setItem(SESSION_STORAGE.LOCATION, location.pathname);
	});

	useEffect(() => {
		getUsersFx(currentParams);
	}, [currentParams]);

	// useEffect(() => {
	// 	const searchStream$ = fromEvent(searchRef.current, 'onChange');
	// 	searchStream$.subscribe(change => console.log(change));
	// https://www.youtube.com/watch?v=i_bwptbaSRA

	// }, [])

	const handlePageChange = (event: MouseEvent<HTMLButtonElement> | null, page: number) => {
		const savedRequestParams = JSON.stringify({ ...requestParams, page: page + 1 });
		sessionStorage.setItem(SESSION_STORAGE.USERS_REQUEST_PARAMS, savedRequestParams);

		const newRequestParams = { ...requestParams, page: page + 1 };
		setUsersRequestParams(newRequestParams);
	};

	const handleOnRowPerPageChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		const savedRequestParams = JSON.stringify({
			...requestParams,
			count: Number(event.target.value),
		});
		sessionStorage.setItem(SESSION_STORAGE.USERS_REQUEST_PARAMS, savedRequestParams);

		const newRequestParams = { ...requestParams, count: Number(event.target.value) };
		setUsersRequestParams(newRequestParams);
	};

	const handleOnChangeSearchInput = (
		event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined,
	) => {
		const text = event && event;
		return text;
	};

	const user = usersData.items.map((item) => <User key={item.id} user={item} />);

	return (
		<div className={styles.usersContainer}>
			{isUsersLoading && <Loader />}
			<Stack spacing={2}>
				<TextField
					id='search'
					name='search'
					ref={searchRef}
					label='Найти пользователя'
					color='secondary'
					variant='filled'
					maxRows={1}
					type='search'
					InputProps={{
						startAdornment: (
							<InputAdornment position='start'>
								<SearchIcon />
							</InputAdornment>
						),
					}}
					onChange={handleOnChangeSearchInput}
				/>
			</Stack>
			{!isUsersLoading && <List>{user}</List>}
			<Stack spacing={2}>
				<TablePagination
					component={'div'}
					count={usersData.totalCount}
					page={currentParams.page - 1}
					onPageChange={handlePageChange}
					rowsPerPage={currentParams.count}
					onRowsPerPageChange={handleOnRowPerPageChange}
					showFirstButton
					showLastButton
				/>
			</Stack>
		</div>
	);
};
