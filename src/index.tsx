import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';

import { store } from 'store/createStore';
import { client } from 'shared/apolloConfig';

import App from './App';

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<Router>
				<ApolloProvider client={client}>
					<App />
				</ApolloProvider>
			</Router>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root'),
);
