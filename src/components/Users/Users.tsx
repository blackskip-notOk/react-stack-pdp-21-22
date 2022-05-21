import { SESSION_STORAGE } from '@/constants/systemConstants';
import {
	$users,
	$usersLoading,
	$usersRequestParams,
	getUsersFx,
	setUsersRequestParams,
} from '@/models/users';
import {
	Button,
	Checkbox,
	FormControlLabel,
	InputAdornment,
	List,
	Stack,
	TablePagination,
	TextField,
} from '@mui/material';
import { useStore } from 'effector-react';
import {
	FC,
	useEffect,
	type MouseEvent,
	type ChangeEvent,
	useMemo,
	useState,
	type KeyboardEvent,
} from 'react';
import { Loader } from '../common/loader/Loader';
import { User } from '../User/User';
import styles from './Users.module.less';
import SearchIcon from '@mui/icons-material/Search';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { saveSessionParams } from '@/utils';
import { UsersRequest } from '@/models/users/types';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorMessage } from '../common/Error/Error';

export const Users: FC = () => {
	const usersData = useStore($users);
	const requestParams = useStore($usersRequestParams);
	const isUsersLoading = useStore($usersLoading);

	const [searchText, setSearchText] = useState('');
	const [onlyFriends, setOnlyFriends] = useState(false);
	const [onlyNotFriends, setOnlyNotFriends] = useState(false);

	const savedRequestParams = sessionStorage.getItem(SESSION_STORAGE.USERS_REQUEST_PARAMS);

	const currentParams: UsersRequest = useMemo(
		() => (savedRequestParams ? JSON.parse(savedRequestParams) : { ...requestParams }),
		[savedRequestParams, requestParams],
	);

	useEffect(() => {
		getUsersFx(currentParams);

		if (currentParams.friend) {
			setOnlyFriends(true);
		} else if (currentParams.friend === false) {
			setOnlyNotFriends(true);
		}
	}, [currentParams]);

	const handlePageChange = (event: MouseEvent<HTMLButtonElement> | null, page: number) => {
		const newRequestParams = { ...requestParams, page: page + 1 };
		saveSessionParams(newRequestParams);
		setUsersRequestParams(newRequestParams);
	};

	const handleOnRowPerPageChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		const newRequestParams = { ...requestParams, count: Number(event.target.value) };
		saveSessionParams(newRequestParams);
		setUsersRequestParams(newRequestParams);
	};

	const handleOnChangeSearchInput = (
		event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined,
	) => {
		if (event) {
			const text = event.currentTarget.value;
			setSearchText(text);
		}
	};

	const handleOnClearSearchInput = () => {
		const newParams = { ...requestParams, page: 1, term: '' };
		saveSessionParams(newParams);
		setUsersRequestParams(newParams);
		setSearchText('');
	};

	const handleSearch = () => {
		const newParams = { ...requestParams, page: 1, term: searchText };
		saveSessionParams(newParams);
		setUsersRequestParams(newParams);
	};

	const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.code === 'Enter') {
			handleSearch();
		}
	};

	const handleFriendsChange = () => {
		setOnlyFriends(!onlyFriends);
		const newParams = { ...requestParams, friend: onlyFriends ? undefined : true };
		saveSessionParams(newParams);
		setUsersRequestParams(newParams);
		if (onlyNotFriends) {
			setOnlyNotFriends(false);
		}
	};

	const handleNotFriendsChange = () => {
		setOnlyNotFriends(!onlyNotFriends);
		const newParams = { ...requestParams, friend: onlyNotFriends ? undefined : false };
		saveSessionParams(newParams);
		setUsersRequestParams(newParams);
		if (onlyFriends) {
			setOnlyFriends(false);
		}
	};

	const user = usersData.items.map((item) => (
		<ErrorBoundary key={item.id} fallbackRender={({ error }) => <ErrorMessage error={error} />}>
			<User key={item.id} user={item} />
		</ErrorBoundary>
	));

	return (
		<ErrorBoundary fallbackRender={({ error }) => <ErrorMessage error={error} />}>
			<div className={styles.usersContainer}>
				{isUsersLoading && <Loader />}
				<Stack spacing={2}>
					<div className={styles.searchContainer}>
						<TextField
							id='search'
							name='search'
							label='Найти пользователя'
							color='secondary'
							variant='filled'
							maxRows={1}
							value={searchText}
							InputProps={{
								startAdornment: (
									<InputAdornment position='start'>
										<SearchIcon />
									</InputAdornment>
								),
								endAdornment: searchText ? (
									<InputAdornment position='end' onClick={handleOnClearSearchInput}>
										<HighlightOffIcon />
									</InputAdornment>
								) : null,
							}}
							onChange={handleOnChangeSearchInput}
							onKeyDown={handleKeyDown}
							placeholder={'Поиск по никнэйму'}
						/>
						<Button color='secondary' variant='contained' size='large' onClick={handleSearch}>
							{'Поиск'}
						</Button>
					</div>
				</Stack>
				<Stack spacing={2}>
					<FormControlLabel
						value='onlyFriends'
						control={
							<Checkbox
								checked={onlyFriends}
								onChange={handleFriendsChange}
								color='secondary'
								inputProps={{ 'aria-label': 'controlled' }}
							/>
						}
						label='Показать только друзей'
						labelPlacement='start'
					/>
					<FormControlLabel
						value='onlyNotFriends'
						control={
							<Checkbox
								checked={onlyNotFriends}
								onChange={handleNotFriendsChange}
								color='secondary'
								inputProps={{ 'aria-label': 'controlled' }}
							/>
						}
						label='Показать только не друзей'
						labelPlacement='start'
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
		</ErrorBoundary>
	);
};
