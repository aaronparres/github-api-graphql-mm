import { useState } from 'react';
import {
	Issue,
	useGetRepoIssuesQuery,
	useGetSearchIssuesLazyQuery,
} from 'hooks/apihooks';
import SearchItem from 'components/SearchItem';

import './App.scss';

export default function App() {
	const [input, setInput] = useState('');

	const { data, error, loading } = useGetRepoIssuesQuery({
		variables: { name: 'react', owner: 'facebook' },
	});
	const [
		getSearchIssues,
		{ data: dataSearch, error: errorSearch, loading: loadingSearch },
	] = useGetSearchIssuesLazyQuery();

	const searchInputHandler = () => {
		getSearchIssues({ variables: { search_term: input } });
	};

	return (
		<div className="container">
			<h1>ISSUES</h1>
			{loading ? (
				<>Loading...</>
			) : error ? (
				<>{error}</>
			) : data?.repository?.issues?.edges?.length ? (
				<>
					{data?.repository?.issues.edges?.map((issue) => (
						<div key={issue?.node?.id}>
							<p>{issue?.node?.author?.login}</p>
							<p>{issue?.node?.createdAt}</p>
							<h2>{issue?.node?.title}</h2>
							{/* <p>{issue?.node?.body}</p> */}
							<b>_______________________</b>
						</div>
					))}
				</>
			) : null}

			<h1>SEARCH</h1>
			<p>repo:facebook/react in:title in:body is:issue is:open state</p>
			<input
				type="text"
				value={input}
				onChange={(e) => setInput(e.target.value)}
			/>
			<button onClick={searchInputHandler}>Search</button>
			{loadingSearch ? (
				<>Loading...</>
			) : errorSearch ? (
				<>{error}</>
			) : dataSearch?.search?.edges?.length ? (
				<>
					{dataSearch?.search?.edges?.map((issue) => {
						const { title, id, body, comments } = issue?.node as Issue;
						return (
							<SearchItem
								key={id}
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
