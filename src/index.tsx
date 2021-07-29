import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ApolloProvider } from '@apollo/client';

import { persistor, store } from 'store/createStore';
import { client } from 'shared/apolloConfig';

import App from './App';

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<Router>
					<ApolloProvider client={client}>
						<App />
					</ApolloProvider>
				</Router>
			</PersistGate>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root'),
);
