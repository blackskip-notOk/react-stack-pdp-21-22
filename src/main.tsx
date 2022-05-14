import { createRoot } from 'react-dom/client';
import { App } from './App';
import { BrowserRouter } from 'react-router-dom';
import './models/init';
import { APP_MESSAGES } from './constants/serverMessages';
import { QueryClient, QueryClientProvider } from 'react-query';

const container = document.getElementById('root');

if (!container) throw new Error(`${APP_MESSAGES.NOT_ROOT}`);

const root = createRoot(container);

const queryClient = new QueryClient();

root.render(
	<BrowserRouter>
		<QueryClientProvider client={queryClient}>
			<App />
		</QueryClientProvider>
	</BrowserRouter>,
);
