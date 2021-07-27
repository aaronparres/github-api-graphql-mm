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
						keyArgs: ['edges'],
						merge(existing = [], incoming) {
							return { ...existing, ...incoming };
						},
					},
					search: {
						keyArgs: ['edges'],
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
