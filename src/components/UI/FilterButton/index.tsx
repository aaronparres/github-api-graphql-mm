import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCheckCircle,
	faDotCircle,
} from '@fortawesome/free-regular-svg-icons';

import styles from './styles.module.scss';

interface FilterButtonProps {
	state?: string;
	isActive?: boolean;
	filterHandler: () => void;
}

export default function FilterButton({
	state,
	isActive,
	filterHandler,
}: FilterButtonProps) {
	return (
		<div
			onClick={filterHandler}
			className={`${styles.filter} ${state && styles[state]} ${
				isActive && styles.isActive
			}`}
		>
			<span>
				{state !== 'all' && (
					<FontAwesomeIcon
						icon={state === 'open' ? faDotCircle : faCheckCircle}
					/>
				)}{' '}
				{`${state?.charAt(0).toUpperCase()}${state?.slice(1)}`}
			</span>
		</div>
	);
}
