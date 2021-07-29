import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './styles.module.scss';

interface PaginationButtonProps {
	click: () => void;
	text: string;
	iconLeft?: boolean;
	iconRight?: boolean;
}

export default function PaginationButton({
	click,
	text,
	iconLeft,
	iconRight,
}: PaginationButtonProps) {
	return (
		<div className={styles.paginationButton} onClick={click}>
			{iconLeft && <FontAwesomeIcon icon={faAngleLeft} />}
			<p>{text}</p>
			{iconRight && <FontAwesomeIcon icon={faAngleRight} />}
		</div>
	);
}
