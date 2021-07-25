interface IssueItemProps {
	key?: string;
	user?: string;
	date?: string;
	title?: string;
}

export default function IssueItem({ key, user, date, title }: IssueItemProps) {
	return (
		<div>
			<p>{user}</p>
			<p>{date}</p>
			<h2>{title}</h2>
			{/* <p>{body}</p> */}
			<b>_______________________</b>
		</div>
	);
}
