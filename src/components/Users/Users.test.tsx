import { screen, waitFor } from '@testing-library/react';
import { usersResponse } from '~/mocks/handlers';
import { server } from '~/mocks/server';
import { setUsersData } from '~/store/slices/usersSlice';
import { setupStore } from '~/store/store';
import { renderWithProviders } from '~/utils/testUtils';
import { Loader } from '../common/loader/Loader';
import { Users } from './Users';

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

test('fetch users', async () => {
	const { container: loaderContainer } = renderWithProviders(<Loader />);
	const loader = loaderContainer.querySelector('.loader');

	renderWithProviders(<Users />);

	expect(screen.getByTestId('suspense-loader')).toBeInTheDocument();
	expect(loader).toBeInTheDocument();

	await waitFor(() => {
		expect(screen.getByLabelText('Найти пользователя')).toBeInTheDocument();
		expect(screen.getByPlaceholderText('Поиск по никнэйму')).toBeInTheDocument();
		expect(screen.getByRole('button', { name: 'Поиск' })).toBeInTheDocument();
		expect(screen.getByLabelText('Select')).toBeInTheDocument();
		expect(screen.getByTestId('pagination')).toBeInTheDocument();
		expect(screen.getByRole('button', { name: 'Rows per page: 10' })).toBeInTheDocument();
	});
});

test('fetch users list', async () => {
	const store = setupStore();
	store.dispatch(setUsersData(usersResponse));

	const { getAllByRole, getByText } = renderWithProviders(<Users />);

	await waitFor(() => {
		expect(getAllByRole('listitem')).toHaveLength(10);
		expect(getAllByRole('checkbox', { name: 'Добавить в друзья' })).toHaveLength(10);
		expect(getByText('Kariben')).toBeInTheDocument();
	});
});
