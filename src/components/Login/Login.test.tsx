import * as renderer from 'react-test-renderer';
import { Login } from './Login';
import { BrowserRouter } from 'react-router-dom';

const setShowGreeting = jest.fn();

it('renders correctly', () => {
	const tree = renderer
		.create(
			<BrowserRouter>
				<Login setShowGreeting={setShowGreeting} />
			</BrowserRouter>,
		)
		.toJSON();

	expect(tree).toMatchSnapshot();
});
