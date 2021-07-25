import { useState, SyntheticEvent, FormEvent } from 'react';
import { Issue, useGetSearchIssuesLazyQuery } from 'hooks/apihooks';

import ListItem from 'components/ListItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export default function Search() {
	const [input, setInput] = useState('');

	const [getSearchIssues, { data, error, loading }] =
		useGetSearchIssuesLazyQuery();

	const searchInputHandler = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		getSearchIssues({ variables: { search_term: input } });
	};
	return (
		<div style={{ width: '100%', wordWrap: 'break-word', overflow: 'hidden' }}>
			<p>repo:facebook/react in:title in:body is:issue is:open state</p>
			<form style={{ display: 'flex' }} onSubmit={searchInputHandler}>
				<input
					style={{
						outline: 'none',
						width: '80vw',
						padding: '15px',
						borderRadius: '15px',
						border: '0',
						fontSize: '1rem',
					}}
					type="text"
					placeholder="Search issues..."
					value={input}
					onChange={(e) => setInput(e.target.value)}
				/>
				<button
					type="submit"
					style={{
						border: '0',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						width: '50px',
						backgroundColor: 'transparent',
						color: 'white',
						fontSize: '1.5rem',
						cursor: 'pointer',
					}}
				>
					<FontAwesomeIcon icon={faSearch} />
				</button>
			</form>
			{loading ? (
				<>Loading...</>
			) : error ? (
				<>{error}</>
			) : data?.search?.edges?.length ? (
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
