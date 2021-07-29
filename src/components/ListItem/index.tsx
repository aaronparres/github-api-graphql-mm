import StatusBadge from 'components/UI/StatusBadge';
import { IssueState } from 'hooks/apihooks';
import { useHistory } from 'react-router-dom';
import { dateFormatter } from 'shared/utils/dateFormatter';

import styles from './styles.module.scss';

interface IssueItemProps {
	user?: string;
	date?: string;
	title?: string;
	state?: IssueState;
	number?: number;
	userUrl?: string;
	image?: string;
}

export default function IssueItem({
	user,
	state,
	date,
	title,
	number,
	userUrl,
	image,
}: IssueItemProps) {
	const history = useHistory();

	return (
		<div
			className={styles.content}
			onClick={() => history.push(`issue/${number}`)}
		>
			<div className={styles.header}>
				<div className={styles.status}>
					<StatusBadge state={state} />
					<h2>{title}</h2>
				</div>
				<div className={styles.user}>
					<img src={image} alt={user} />
					<a href={userUrl || '#'}>
						<p className={styles.name}>{user}</p>
					</a>

					<p>{`opened ${dateFormatter(String(date))}`}</p>
					<p className={styles.number}># {number}</p>
				</div>
			</div>
		</div>
	);
}
