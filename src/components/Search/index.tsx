import { useState, FormEvent, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { Issue, Maybe, useGetSearchIssuesLazyQuery } from 'hooks/apihooks';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import {
	changeLoadingValue,
	selectSearchIssuesType,
	showErrorModal,
	toggleSearchIssuesType,
} from 'store/slices/settings';

import ListItem from 'components/ListItem';
import PaginationButtonRow from 'components/UI/PaginationButtonRow';

import styles from './styles.module.scss';

export default function Search() {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const dispatch = useAppDispatch();
	const searchIssuesType = useAppSelector(selectSearchIssuesType);
	const [input, setInput] = useState('');
	const [query, setQuery] = useState('');
	const [errorInput, setErrorInput] = useState(false);

	const [getSearchIssues, { data, error, loading, called }] =
		useGetSearchIssuesLazyQuery({ fetchPolicy: 'cache-and-network' });

	useEffect(() => {
		dispatch(changeLoadingValue(loading));
	}, [loading]);

	useEffect(() => {
		if (error == undefined) return;
		dispatch(showErrorModal(true));
	}, [error]);

	useEffect(() => {
		queryInputHandler(searchIssuesType);
	}, [input]);

	const queryComposer = (options: string[]) => {
		const indexToClean = options.findIndex((op) => op === '');
		if (indexToClean !== -1) options.splice(indexToClean, 1);
		return options.join(' ').trim();
	};

	const searchFormHandler = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (input === '') {
			setErrorInput(true);
			return;
		}
		let composedQuery = '';
		if (query === '') {
			composedQuery = queryComposer([
				'repo:facebook/react',
				'is:issue',
				'in:body',
				'in:title',
				input,
			]);
		}
		setErrorInput(false);
		getSearchIssues({ variables: { search_term: query || composedQuery } });
	};

	const queryInputHandler = (type: string) => {
		const composedQuery = queryComposer([
			'repo:facebook/react',
			'is:issue',
			'in:title',
			'in:body',
			getIssuesType(type),
			input,
		]);
		setQuery(composedQuery);
	};

	const getIssuesType = (type: string): string => {
		dispatch(toggleSearchIssuesType(type));
		if (type === 'open' || type === 'closed') {
			return `is:${type}`;
		}
		return '';
	};

	const pageHandler = (cursor: Maybe<string>, direction: string) => {
		getSearchIssues({ variables: { search_term: query, [direction]: cursor } });
		window.scrollTo(0, 0);
	};

	return (
		<div className={styles.search}>
			<form className={styles.form} onSubmit={searchFormHandler}>
				<input
					className={styles.input}
					type="search"
					placeholder="Search issues..."
					value={input}
					onChange={(e) => setInput(e.target.value)}
				/>
				<button type="submit" className={styles.submitButton}>
					<FontAwesomeIcon icon={faSearch} />
				</button>
			</form>
			<button
				disabled={searchIssuesType === 'all'}
				onClick={() => queryInputHandler('all')}
			>
				All
			</button>
			<button
				disabled={searchIssuesType === 'open'}
				onClick={() => queryInputHandler('open')}
			>
				Open
			</button>
			<button
				disabled={searchIssuesType === 'closed'}
				onClick={() => queryInputHandler('closed')}
			>
				Closed
			</button>
			{errorInput ? (
				<p>Invalid value</p>
			) : data?.search?.edges?.length ? (
				<>
					<p>{data.search.issueCount} total issues</p>
					{data?.search?.edges?.map((issue) => {
						const { title, id, number, state, createdAt, author } =
							issue?.node as Issue;
						return (
							<ListItem
								key={id}
								number={number}
								state={state}
								user={author?.login}
								date={createdAt}
								title={title}
								image={author?.avatarUrl}
							/>
						);
					})}
					<PaginationButtonRow
						changePageHandler={pageHandler}
						hasPrevious={data?.search?.pageInfo?.hasPreviousPage}
						hasNext={data?.search?.pageInfo?.hasNextPage}
						startCursor={data?.search?.pageInfo?.startCursor}
						endCursor={data?.search?.pageInfo?.endCursor}
					/>
				</>
			) : (
				called && !loading && <p>No results found...</p>
			)}
		</div>
	);
}
