import { useGetIssueInfoQuery } from 'hooks/apihooks';
import { useParams } from 'react-router-dom';

import styles from './styles.module.scss';

interface ParamTypes {
	number: string;
}

export default function IssueDetail() {
	const { number } = useParams<ParamTypes>();
	const { data, error, loading } = useGetIssueInfoQuery({
		variables: { name: 'react', owner: 'facebook', number: +number },
	});

	return (
		<div className={styles.issueDetailContainer}>
			{loading ? (
				<>Loading...</>
			) : error ? (
				<>{error}</>
			) : data?.repository?.issue ? (
				<>
					<p>{data?.repository?.issue?.title}</p>
					<p>{data?.repository?.issue?.number}</p>
					<p>{data?.repository?.issue?.author?.login}</p>
					<div className={styles.textContent}>
						{data?.repository?.issue?.body}
					</div>
					<h3>Comments</h3>
					{data?.repository?.issue?.comments?.edges?.length
						? data?.repository?.issue?.comments?.edges?.map((comment) => (
								<div key={comment?.node?.id} className={styles.textContent}>
									{comment?.node?.body}
									<p>________________________</p>
								</div>
						  ))
						: 'No comments yet'}
				</>
			) : null}
		</div>
	);
}
