import { useState, FormEvent, useEffect } from 'react';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { Issue, Maybe, useGetSearchIssuesLazyQuery } from 'hooks/apihooks';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import {
	changeLoadingValue,
	selectSearchIssuesType,
	showErrorModal,
	toggleSearchIssuesType,
} from 'store/slices/settings';
import {
	selectPreviousSearchElements,
	updatePreviousSearchTerms,
} from 'store/slices/search';

import ListItem from 'components/ListItem';
import PaginationButtonRow from 'components/UI/PaginationButtonRow';
import FilterButton from 'components/UI/FilterButton';
import Input from 'components/UI/Input';
import SearchBadge from 'components/UI/SearchBadge';

import { numberFormatter } from 'shared/utils/numberFormatter';

import styles from './styles.module.scss';

export default function Search() {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const dispatch = useAppDispatch();
	const searchIssuesType = useAppSelector(selectSearchIssuesType);
	const previousSearchTerms = useAppSelector(selectPreviousSearchElements);
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
		dispatch(updatePreviousSearchTerms(input));
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
			<div className={styles.filtersContainer}>
				<span>
					<p>Filter by:</p>
				</span>
				<div className={styles.buttonRow}>
					<FilterButton
						isActive={searchIssuesType === 'all'}
						state={'all'}
						filterHandler={() => queryInputHandler('all')}
					/>
					<FilterButton
						isActive={searchIssuesType === 'open'}
						state={'open'}
						filterHandler={() => queryInputHandler('open')}
					/>
					<FilterButton
						isActive={searchIssuesType === 'closed'}
						state={'closed'}
						filterHandler={() => queryInputHandler('closed')}
					/>
				</div>
			</div>
			<form className={styles.form} onSubmit={searchFormHandler}>
				<Input
					type="search"
					placeholder="Search issues..."
					value={input}
					icon={faSearch}
					inputHandler={setInput}
				/>
			</form>

			{errorInput ? (
				<p className={styles.error}>Invalid input value</p>
			) : data?.search?.edges?.length ? (
				<>
					<p>{numberFormatter(data.search.issueCount)} total issues</p>
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
			) : called && !loading ? (
				<p>No results found...</p>
			) : (
				<>
					{previousSearchTerms.length > 0 && !loading && (
						<>
							<p className={styles.previousText}>Previous searched terms</p>
							<div className={styles.previousSearches}>
								{previousSearchTerms.map((term, index) => (
									<SearchBadge key={index} text={term} click={setInput} />
								))}
							</div>
						</>
					)}
				</>
			)}
		</div>
	);
}
