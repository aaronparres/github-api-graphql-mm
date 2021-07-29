import { useEffect } from 'react';

import { IssueState, Maybe, useGetRepoIssuesLazyQuery } from 'hooks/apihooks';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import {
	changeLoadingValue,
	selectListIssueType,
	showErrorModal,
	toggleListIssuesType,
} from 'store/slices/settings';

import ListItem from 'components/ListItem';
import PaginationButtonRow from 'components/UI/PaginationButtonRow';
import FilterButton from 'components/UI/FilterButton';

import { numberFormatter } from 'shared/utils/numberFormatter';

import styles from './styles.module.scss';

export default function Issues() {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const dispatch = useAppDispatch();
	const listIssueType = useAppSelector(selectListIssueType);
	const [getRepoIssues, { data, error, loading }] = useGetRepoIssuesLazyQuery({
		fetchPolicy: 'cache-and-network',
	});

	useEffect(() => {
		getRepoIssues({
			variables: {
				name: 'react',
				owner: 'facebook',
				state: listIssueType,
				firstSize: 20,
			},
		});
	}, [listIssueType]);

	useEffect(() => {
		dispatch(changeLoadingValue(loading));
	}, [loading]);

	useEffect(() => {
		if (error == undefined) return;
		dispatch(showErrorModal(true));
	}, [error]);

	const switchHandler = (state: IssueState) => {
		dispatch(toggleListIssuesType(state));
	};

	const pageHandler = (cursor: Maybe<string>, direction: string) => {
		getRepoIssues({
			variables: {
				firstSize: direction === 'after' ? 20 : null,
				lastSize: direction === 'before' ? 20 : null,
				[direction]: cursor,
				name: 'react',
				owner: 'facebook',
				state: listIssueType,
			},
		});
		window.scrollTo(0, 0);
	};

	return (
		<div className={styles.issuesContainer}>
			<h2 className={styles.mainTitle}>Issues</h2>
			<div className={styles.filtersContainer}>
				<FilterButton
					isActive={listIssueType === IssueState.Open}
					state={'open'}
					filterHandler={() => switchHandler(IssueState.Open)}
				/>
				<FilterButton
					isActive={listIssueType === IssueState.Closed}
					state={'closed'}
					filterHandler={() => switchHandler(IssueState.Closed)}
				/>
			</div>
			{data?.repository?.issues?.edges?.length ? (
				<>
					<p>{`${numberFormatter(
						data.repository.issues.totalCount,
					)} total issues`}</p>
					{data?.repository?.issues?.edges?.map((issue) => (
						<ListItem
							key={issue?.node?.id}
							number={issue?.node?.number}
							state={issue?.node?.state}
							user={issue?.node?.author?.login}
							date={issue?.node?.createdAt}
							title={issue?.node?.title}
							image={issue?.node?.author?.avatarUrl}
						/>
					))}
					<PaginationButtonRow
						changePageHandler={pageHandler}
						hasPrevious={data?.repository?.issues?.pageInfo?.hasPreviousPage}
						hasNext={data?.repository?.issues?.pageInfo?.hasNextPage}
						startCursor={data?.repository?.issues?.pageInfo?.startCursor}
						endCursor={data?.repository?.issues?.pageInfo?.endCursor}
					/>
				</>
			) : null}
		</div>
	);
}
