import { useState } from 'react';
import { Issue, useGetSearchIssuesLazyQuery } from 'hooks/apihooks';

import SearchItem from './SearchItem';

export default function Search() {
	const [input, setInput] = useState('');

	const [getSearchIssues, { data, error, loading }] =
		useGetSearchIssuesLazyQuery();

	const searchInputHandler = () => {
		getSearchIssues({ variables: { search_term: input } });
	};
	return (
		<div className="container">
			<h1>SEARCH</h1>
			<p>repo:facebook/react in:title in:body is:issue is:open state</p>
			<input
				type="text"
				value={input}
				onChange={(e) => setInput(e.target.value)}
			/>
			<button onClick={searchInputHandler}>Search</button>
			{loading ? (
				<>Loading...</>
			) : error ? (
				<>{error}</>
			) : data?.search?.edges?.length ? (
				<>
					{data?.search?.edges?.map((issue) => {
						const { title, id, body, comments, number } = issue?.node as Issue;
						return (
							<SearchItem
								key={id}
								number={number}
								title={title}
								comments={comments}
								text={body}
							/>
						);
					})}
				</>
			) : null}
		</div>
	);
}
