import { IssueState, useGetRepoIssuesLazyQuery } from 'hooks/apihooks';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
	selectListIssueType,
	toggleListIssuesType,
} from 'store/slices/settings';

import IssueItem from './IssueItem';
import './styles.scss';

export default function IssuesList() {
	const dispatch = useAppDispatch();
	const listIssueType = useAppSelector(selectListIssueType);
	const [getRepoIssues, { data, error, loading }] = useGetRepoIssuesLazyQuery();

	useEffect(() => {
		getRepoIssues({
			variables: { name: 'react', owner: 'facebook', state: listIssueType },
		});
	}, [listIssueType]);

	const switchHandler = (state: IssueState) => {
		dispatch(toggleListIssuesType(state));
	};

	return (
		<div className="container">
			<div className="buttonContainer">
				<div
					className={`${
						listIssueType === IssueState.Open ? 'buttonSelected' : 'buttonIdle'
					}`}
				>
					<div onClick={() => switchHandler(IssueState.Open)}>OPEN</div>
				</div>
				<div
					className={`${
						listIssueType === IssueState.Closed
							? 'buttonSelected'
							: 'buttonIdle'
					}`}
				>
					<div onClick={() => switchHandler(IssueState.Closed)}>CLOSED</div>
				</div>
			</div>
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
