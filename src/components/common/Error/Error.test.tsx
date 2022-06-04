import * as renderer from 'react-test-renderer';
import { ErrorMessage } from './Error';
import { BrowserRouter } from 'react-router-dom';

test('renders correctly', () => {
	const error = new Error('Error Message');

	const tree = renderer
		.create(
			<BrowserRouter>
				<ErrorMessage error={error} />
			</BrowserRouter>,
		)
		.toJSON();

	expect(tree).toMatchSnapshot();
});
