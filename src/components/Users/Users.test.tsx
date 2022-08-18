import { screen } from '@testing-library/react';
import { renderWithContext } from '~/utils/testUtils';
import { Users } from './Users';
import { setRequestCount } from '~/store/slices/usersSlice/request';
import * as appApi from '~/store/slices/apiSlice';
import mockUsers from '~/mocks/users.json';

const fetchUsersSpy = vi.spyOn(appApi, 'useFetchUsersQuery');
fetchUsersSpy.mockResolvedValue({ data: mockUsers });

describe('Users.tsx', () => {
	describe('dispatching actions to a redux store', () => {
		test('if press on pagination button, should set page number in state', async () => {
			const { store } = renderWithContext(<Users />);
			store.dispatch(setRequestCount(25));

			const searchButton = screen.getByRole('button', { name: /поиск/i });
			const rowPerPageButton = screen.getByRole('button', { name: /10/i });

			expect(searchButton).toBeInTheDocument();
			expect(searchButton).toHaveTextContent(/поиск/i);
			expect(screen.getByRole('button', { name: /go to next page/i })).toBeInTheDocument();
			expect(rowPerPageButton).toBeInTheDocument();
			expect(rowPerPageButton).toHaveTextContent('10');
			expect(rowPerPageButton).not.toHaveTextContent('25');
		});
	});
});
