import ReactDOM from 'react-dom'
import { App } from './App'
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'
import { queryClient } from './api';



ReactDOM.render(
	<BrowserRouter>
		<QueryClientProvider client={queryClient}>
			<App />
			<ReactQueryDevtools initialIsOpen={true} />
		</QueryClientProvider>
	</BrowserRouter>,
	document.getElementById('root')
);
