import { useState } from 'react';
import {
	Issue,
	useGetRepoIssuesQuery,
	useGetSearchIssuesLazyQuery,
} from 'hooks/apihooks';

import './App.scss';

function App() {
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
			) : data?.repository?.issues?.nodes?.length ? (
				<>
					{data?.repository?.issues?.nodes?.map((issue, index) => (
						<div key={index}>{issue?.title}</div>
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
					{dataSearch?.search?.edges?.map((issue, index) => {
						const issueCasted = issue?.node as Issue;
						return <SearchItem key={index} issue={issueCasted} />;
						// <div key={index}>{`search ${JSON.stringify(issue)}`}</div>
					})}
				</>
			) : null}
		</div>
	);
}

export default App;

interface SearchItemProps {
	issue: Issue;
}

function SearchItem({ issue }: SearchItemProps) {
	return (
		<>
			<h2>{issue.title}</h2>
			<div>
				{issue?.comments?.edges?.map((comment, index) => (
					<div key={index}>
						<p>{comment?.node?.author?.login}</p>
						<p>{comment?.node?.bodyText}</p>
					</div>
				))}
			</div>
		</>
	);
}
