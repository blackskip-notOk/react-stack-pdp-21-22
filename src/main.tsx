import { createRoot } from 'react-dom/client';
import { App } from './App';
import { HashRouter } from 'react-router-dom';
import { AppMessage } from './constants/serverMessages';
import { store } from './store/store';
import { Provider } from 'react-redux';

const container = document.getElementById('root');

if (!container) throw new Error(`${AppMessage.notRoot}`);

const root = createRoot(container);

root.render(
	<HashRouter>
		<Provider store={store}>
			<App />
		</Provider>
	</HashRouter>,
);
