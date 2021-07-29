import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCheckCircle,
	faDotCircle,
} from '@fortawesome/free-regular-svg-icons';
import { IssueState } from 'hooks/apihooks';

import styles from './styles.module.scss';

interface StatusBadgeProps {
	state?: IssueState;
}

export default function StatusBadge({ state }: StatusBadgeProps) {
	return (
		<div
			className={`${styles.state} ${
				state === IssueState.Closed && styles.closed
			}`}
		>
			<span>
				<FontAwesomeIcon
					icon={state === IssueState.Open ? faDotCircle : faCheckCircle}
				/>{' '}
				{`${state?.charAt(0)}${state?.toLowerCase().slice(1)}`}
			</span>
		</div>
	);
}
