import { createRoot } from 'react-dom/client';
import { App } from './App';
import { HashRouter } from 'react-router-dom';
import './models/init';
import { APP_MESSAGES } from './constants/serverMessages';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { store } from './store/store';
import { Provider } from 'react-redux';

const container = document.getElementById('root');

if (!container) throw new Error(`${APP_MESSAGES.NOT_ROOT}`);

const root = createRoot(container);

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			useErrorBoundary: true,
			retry: 5,
			retryDelay: (attempt) => Math.min(attempt > 1 ? 2 ** attempt * 1000 : 1000, 30 * 1000),
			notifyOnChangeProps: ['data', 'error'],
			suspense: true,
		},
		mutations: {
			useErrorBoundary: true,
			retry: 5,
			retryDelay: (attempt) => Math.min(attempt > 1 ? 2 ** attempt * 1000 : 1000, 30 * 1000),
		},
	},
});

root.render(
	<HashRouter>
		<Provider store={store}>
			<QueryClientProvider client={queryClient}>
				<App />
				<ReactQueryDevtools initialIsOpen={false}></ReactQueryDevtools>
			</QueryClientProvider>
		</Provider>
	</HashRouter>,
);
