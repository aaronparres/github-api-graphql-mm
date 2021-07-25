import { useGetRepoIssuesQuery } from 'hooks/apihooks';
import { Link } from 'react-router-dom';

import IssueItem from './IssueItem';

export default function IssuesList() {
	const { data, error, loading } = useGetRepoIssuesQuery({
		variables: { name: 'react', owner: 'facebook' },
	});

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
						<Link key={issue?.node?.id} to={`issue/${issue?.node?.number}`}>
							<IssueItem
								user={issue?.node?.author?.login}
								date={issue?.node?.createdAt}
								title={issue?.node?.title}
							/>
						</Link>
					))}
				</>
			) : null}
		</div>
	);
}
