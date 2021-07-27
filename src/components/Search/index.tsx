import { useState, FormEvent, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { useAppDispatch } from 'hooks/redux';
import { Issue, useGetSearchIssuesLazyQuery } from 'hooks/apihooks';
import { changeLoadingValue, showErrorModal } from 'store/slices/settings';

import ListItem from 'components/ListItem';

import styles from './styles.module.scss';

export default function Search() {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const dispatch = useAppDispatch();
	const [input, setInput] = useState('');

	const [getSearchIssues, { data, error, loading }] =
		useGetSearchIssuesLazyQuery({ fetchPolicy: 'cache-and-network' });

	useEffect(() => {
		dispatch(changeLoadingValue(loading));
	}, [loading]);

	useEffect(() => {
		if (error == undefined) return;
		dispatch(showErrorModal(true));
	}, [error]);

	const searchInputHandler = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		getSearchIssues({ variables: { search_term: input } });
	};

	return (
		<div className={styles.search}>
			<p>repo:facebook/react in:title in:body is:issue is:open state</p>
			<form className={styles.form} onSubmit={searchInputHandler}>
				<input
					className={styles.input}
					type="text"
					placeholder="Search issues..."
					value={input}
					onChange={(e) => setInput(e.target.value)}
				/>
				<button type="submit" className={styles.submitButton}>
					<FontAwesomeIcon icon={faSearch} />
				</button>
			</form>
			{data?.search?.edges?.length ? (
				<>
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
							/>
						);
					})}
				</>
			) : null}
		</div>
	);
}
