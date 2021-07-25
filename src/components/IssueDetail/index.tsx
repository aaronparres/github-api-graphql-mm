import { useGetIssueInfoQuery } from 'hooks/apihooks';
import { useParams } from 'react-router-dom';

interface ParamTypes {
	number: string;
}

export default function IssueDetail() {
	const { number } = useParams<ParamTypes>();
	const { data, error, loading } = useGetIssueInfoQuery({
		variables: { name: 'react', owner: 'facebook', number: +number },
	});

	return (
		<div>
			{loading ? (
				<>Loading...</>
			) : error ? (
				<>{error}</>
			) : data?.repository?.issue ? (
				<>
					<p>{data?.repository?.issue?.title}</p>
					<p>{data?.repository?.issue?.number}</p>
					<p>{data?.repository?.issue?.body}</p>
					<p>{data?.repository?.issue?.author?.login}</p>
					<h3>Comments</h3>
					{data?.repository?.issue?.comments?.edges?.length
						? data?.repository?.issue?.comments?.edges?.map((comment) => (
								<>
									<p key={comment?.node?.id}>{comment?.node?.body}</p>
									_________________________
								</>
						  ))
						: 'No comments yet'}
				</>
			) : null}
		</div>
	);
}
