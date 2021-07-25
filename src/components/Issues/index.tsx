import { IssueState, useGetRepoIssuesLazyQuery } from 'hooks/apihooks';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
	selectListIssueType,
	toggleListIssuesType,
} from 'store/slices/settings';

import ListItem from 'components/ListItem';
import styles from './styles.module.scss';

export default function Issues() {
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
		<div>
			<div className={styles.buttonContainer}>
				<div
					className={`${
						listIssueType === IssueState.Open
							? `${styles.buttonSelected} ${styles.open}`
							: `${styles.buttonIdle} ${styles.open}`
					}`}
				>
					<div onClick={() => switchHandler(IssueState.Open)}>Open</div>
				</div>
				<div
					className={`${
						listIssueType === IssueState.Closed
							? `${styles.buttonSelected} ${styles.closed}`
							: `${styles.buttonIdle} ${styles.closed}`
					}`}
				>
					<div onClick={() => switchHandler(IssueState.Closed)}>Closed</div>
				</div>
			</div>
			<h1 className={styles.mainTitle}>Issues</h1>
			{loading ? (
				<>Loading...</>
			) : error ? (
				<>{error}</>
			) : data?.repository?.issues?.edges?.length ? (
				<>
					{data?.repository?.issues.edges?.map((issue) => (
						<ListItem
							key={issue?.node?.id}
							number={issue?.node?.number}
							state={issue?.node?.state}
							user={issue?.node?.author?.login}
							date={issue?.node?.createdAt}
							title={issue?.node?.title}
						/>
					))}
				</>
			) : null}
		</div>
	);
}
