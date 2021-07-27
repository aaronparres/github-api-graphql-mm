import { IssueState } from 'hooks/apihooks';
import { Link } from 'react-router-dom';

interface IssueItemProps {
	user?: string;
	date?: string;
	title?: string;
	state?: IssueState;
	number?: number;
}

export default function IssueItem({
	user,
	state,
	date,
	title,
	number,
}: IssueItemProps) {
	return (
		<Link to={`issue/${number}`}>
			<p>{user}</p>
			<p>{date}</p>
			<h2>{title}</h2>
			<p>{state}</p>
			<b>_______________________</b>
		</Link>
	);
}
