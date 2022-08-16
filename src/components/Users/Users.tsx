import {
	Button,
	FormControl,
	InputAdornment,
	InputLabel,
	List,
	MenuItem,
	Select,
	SelectChangeEvent,
	Stack,
	TablePagination,
	TextField,
} from '@mui/material';
import {
	FC,
	useEffect,
	type MouseEvent,
	type ChangeEvent,
	useState,
	type KeyboardEvent,
} from 'react';
import { Loader } from '../common/loader/Loader';
import { User } from '../User/User';
import styles from './Users.module.less';
import SearchIcon from '@mui/icons-material/Search';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { getFriendParam, getSearchParamsFromUrl, searchParamsSerializer } from '~/utils';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorMessage } from '../common/Error/Error';
import { useSearchParams } from 'react-router-dom';
import { equals } from 'ramda';
import { useAppDispatch, useAppSelector } from '~/hooks/storeHooks';
import { usersSelector, usersRequestSelector } from '~/store/selectors/usersSelector';
import { useFetchUsersQuery } from '~/store/slices/apiSlice';
import { setUsersData } from '~/store/slices/usersSlice';
import {
	setUsersRequest,
	setRequestPage,
	setRequestCount,
} from '~/store/slices/usersSlice/request';

export const Users: FC = () => {
	const dispatch = useAppDispatch();

	const { items: users, totalCount } = useAppSelector(usersSelector);
	const storeSearchParams = useAppSelector(usersRequestSelector);

	const { isFetching, isLoading, isSuccess, data } = useFetchUsersQuery(storeSearchParams);

	const [urlSearchParams, setUrlSearchParams] = useSearchParams();

	const [searchText, setSearchText] = useState('');
	const [friend, setFriend] = useState('');

	useEffect(() => {
		if (isSuccess && data) {
			dispatch(setUsersData(data));
		}
		const newUrlSearchParams = searchParamsSerializer(storeSearchParams);
		newUrlSearchParams ? setUrlSearchParams(newUrlSearchParams) : setUrlSearchParams({});
	}, [isSuccess, data]);

	useEffect(() => {
		const searchParamsFromUrl = getSearchParamsFromUrl(Object.fromEntries([...urlSearchParams]));
		let newStoreSearchParams = { ...storeSearchParams };

		if (searchParamsFromUrl) {
			if (!equals(storeSearchParams, searchParamsFromUrl)) {
				const { page, count, term, friend } = searchParamsFromUrl;

				newStoreSearchParams = {
					page: page ?? storeSearchParams.page,
					count: count ?? storeSearchParams.count,
					term: term ?? storeSearchParams.term,
					friend: friend !== undefined ? friend : storeSearchParams.friend,
				};

				setSearchText(newStoreSearchParams.term ? newStoreSearchParams.term : '');

				if (newStoreSearchParams.friend) {
					setFriend('friends');
				} else if (newStoreSearchParams.friend === false) {
					setFriend('notFriends');
				}
			}
		}
		dispatch(setUsersRequest(newStoreSearchParams));
	}, []);

	const handlePageChange = (event: MouseEvent<HTMLButtonElement> | null, page: number): void => {
		dispatch(setRequestPage(page + 1));
	};

	const handleOnRowPerPageChange = (
		event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
	): void => {
		dispatch(setRequestCount(Number(event.target.value)));
	};

	const handleOnChangeSearchInput = (
		event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined,
	): void => {
		if (event) {
			const text = event.currentTarget.value;
			setSearchText(text);
		}
	};

	const handleOnClearSearchInput = (): void => {
		const newRequestParams = { ...storeSearchParams, page: 1, term: '' };
		dispatch(setUsersRequest(newRequestParams));
		setSearchText('');
	};

	const handleSearch = (): void => {
		const newRequestParams = {
			...storeSearchParams,
			page: 1,
			term: searchText ? searchText : undefined,
			friend: getFriendParam(friend),
		};
		dispatch(setUsersRequest(newRequestParams));
	};

	const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
		if (event.code === 'Enter') {
			handleSearch();
		}
	};

	const handleChangeFriends = (event: SelectChangeEvent): void => {
		setFriend(event.target.value);
	};

	const user = users.map((item) => (
		<ErrorBoundary key={item.id} fallbackRender={({ error }) => <ErrorMessage error={error} />}>
			<User key={item.id} user={item} />
		</ErrorBoundary>
	));

	return (
		<ErrorBoundary fallbackRender={({ error }) => <ErrorMessage error={error} />}>
			<div className={styles.usersContainer}>
				{(isFetching || isLoading) && <Loader />}
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
					<FormControl sx={{ minWidth: 80 }}>
						<InputLabel id='friendsSelectorLabel'>Select</InputLabel>
						<Select
							labelId='friendsSelectorLabel'
							id='friendsSelector'
							value={friend}
							onChange={handleChangeFriends}
							label='Select'
							autoWidth
						>
							<MenuItem value='all'>All</MenuItem>
							<MenuItem value='friends'>Friends</MenuItem>
							<MenuItem value='notFriends'>Not Friends</MenuItem>
						</Select>
					</FormControl>
				</Stack>
				{isSuccess && <List>{user}</List>}
				<Stack spacing={2}>
					<TablePagination
						component={'div'}
						count={totalCount}
						page={storeSearchParams.page - 1}
						onPageChange={handlePageChange}
						rowsPerPage={storeSearchParams.count}
						onRowsPerPageChange={handleOnRowPerPageChange}
						showFirstButton
						showLastButton
					/>
				</Stack>
			</div>
		</ErrorBoundary>
	);
};
