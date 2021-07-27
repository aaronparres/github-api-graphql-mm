import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
	uri: 'https://api.github.com/graphql',
	headers: {
		Authorization: `bearer ${process.env.REACT_APP_GITHUB_KEY}`,
	},
	cache: new InMemoryCache({
		typePolicies: {
			Query: {
				fields: {
					repository: {
						keyArgs: ['issues'],
						merge(existing = [], incoming) {
							return { ...existing, ...incoming };
						},
					},
					search: {
						keyArgs: ['issue'],
						merge(existing = [], incoming) {
							return { ...existing, ...incoming };
						},
					},
				},
			},
		},
	}),
	connectToDevTools: process.env.NODE_ENV === 'development',
});
