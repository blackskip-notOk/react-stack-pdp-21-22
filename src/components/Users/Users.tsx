import { SESSION_STORAGE } from '@/constants/systemConstants';
import {
	$users,
	$usersLoading,
	$usersRequestParams,
	getUsersFx,
	setUsersRequestParams,
} from '@/models/users';
import { Button, InputAdornment, List, Stack, TablePagination, TextField } from '@mui/material';
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
import { useSetSessionLocation } from '@/hooks/useSetSessionLocation';

export const Users: FC = () => {
	useSetSessionLocation();

	const usersData = useStore($users);
	const requestParams = useStore($usersRequestParams);
	const isUsersLoading = useStore($usersLoading);

	const [searchText, setSearchText] = useState('');

	const savedRequestParams = sessionStorage.getItem(SESSION_STORAGE.USERS_REQUEST_PARAMS);

	const currentParams = useMemo(
		() => (savedRequestParams ? JSON.parse(savedRequestParams) : { ...requestParams }),
		[savedRequestParams, requestParams],
	);

	useEffect(() => {
		getUsersFx(currentParams);
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
		saveSessionParams({ ...requestParams, term: '' });
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

	const user = usersData.items.map((item) => <User key={item.id} user={item} />);

	return (
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
