import { App } from '../App';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

test('Renders main page correctly', () => {
	render(
		<BrowserRouter>
			<App />
		</BrowserRouter>,
	);

	expect(true).toBeTruthy();
});
