import { createRoot } from 'react-dom/client';
import { App } from './App'
import { BrowserRouter } from 'react-router-dom';
import './models/init';
import { APP_MESSAGES } from './constants/serverMessages';

const container = document.getElementById('root');

if (!container) throw new Error(`${APP_MESSAGES.NOT_ROOT}`);

const root = createRoot(container);

root.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>
);