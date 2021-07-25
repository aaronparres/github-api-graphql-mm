import { IssueCommentConnection } from 'hooks/apihooks';

interface SearchItemProps {
	title?: string;
	text?: string;
	comments?: IssueCommentConnection;
}

export default function SearchItem({ title, text, comments }: SearchItemProps) {
	return (
		<>
			<h2>{title}</h2>
			{/* <p>{text}</p> */}
			<div>
				<h3>Comments</h3>
				{comments?.edges?.length &&
					comments?.edges?.map((comment) => (
						<div key={comment?.node?.id}>
							<p>{comment?.node?.author?.login}</p>
							<p>{comment?.node?.createdAt}</p>
							{/* <p>{comment?.node?.body}</p> */}
						</div>
					))}
			</div>
			<b>_______________________</b>
		</>
	);
}
