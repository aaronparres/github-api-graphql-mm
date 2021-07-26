import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Backdrop from 'components/UI/Backdrop';

import styles from './styles.module.scss';

export default function Modal() {
	return (
		<Backdrop>
			<div className={styles.modal}>
				<div className={styles.content}>
					<FontAwesomeIcon icon={faTimes} />
					<h3>Error</h3>
					<p>We had a problem processing your request</p>
				</div>
			</div>
		</Backdrop>
	);
}
