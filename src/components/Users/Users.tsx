import {
	$users,
	$usersLoading,
	$usersRequestParams,
	getUsersFx,
	setUsersRequestParams,
} from '@/models/users';
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
import { useStore } from 'effector-react';
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
import { getFriendParam, getSearchParamsFromUrl, searchParamsSerializer } from '@/utils';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorMessage } from '../common/Error/Error';
import { useSearchParams } from 'react-router-dom';
import { equals } from 'ramda';

export const Users: FC = () => {
	const usersData = useStore($users);
	const storeSearchParams = useStore($usersRequestParams);
	const isUsersLoading = useStore($usersLoading);

	const [searchText, setSearchText] = useState('');
	const [friend, setFriend] = useState('');

	const [urlSearchParams, setUrlSearchParams] = useSearchParams();

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
		setUsersRequestParams(newStoreSearchParams);
	}, []);

	useEffect(() => {
		const newUrlSearchParams = searchParamsSerializer(storeSearchParams);

		newUrlSearchParams ? setUrlSearchParams(newUrlSearchParams) : setUrlSearchParams({});

		getUsersFx(storeSearchParams); // Todo first query with default params
	}, [storeSearchParams]);

	const handlePageChange = (event: MouseEvent<HTMLButtonElement> | null, page: number): void => {
		const newRequestParams = { ...storeSearchParams, page: page + 1 };
		setUsersRequestParams(newRequestParams);
	};

	const handleOnRowPerPageChange = (
		event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
	): void => {
		const newRequestParams = { ...storeSearchParams, count: Number(event.target.value) };
		setUsersRequestParams(newRequestParams);
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
		const newParams = { ...storeSearchParams, page: 1, term: '' };
		setUsersRequestParams(newParams);
		setSearchText('');
	};

	const handleSearch = (): void => {
		const newParams = {
			...storeSearchParams,
			page: 1,
			term: searchText ? searchText : undefined,
			friend: getFriendParam(friend),
		};
		setUsersRequestParams(newParams);
	};

	const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
		if (event.code === 'Enter') {
			handleSearch();
		}
	};

	const handleChangeFriends = (event: SelectChangeEvent): void => {
		setFriend(event.target.value);
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
				{!isUsersLoading && <List>{user}</List>}
				<Stack spacing={2}>
					<TablePagination
						component={'div'}
						count={usersData.totalCount}
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
