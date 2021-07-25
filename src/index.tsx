import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';

import './index.scss';

const client = new ApolloClient({
	uri: 'https://api.github.com/graphql',
	headers: {
		Authorization: `bearer ${process.env.REACT_APP_GITHUB_KEY}`,
	},
	cache: new InMemoryCache(),
	connectToDevTools: process.env.NODE_ENV === 'development',
});

ReactDOM.render(
	<React.StrictMode>
		<Router>
			<ApolloProvider client={client}>
				<App />
			</ApolloProvider>
		</Router>
	</React.StrictMode>,
	document.getElementById('root'),
);
