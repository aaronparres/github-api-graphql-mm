import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faExclamationTriangle,
	faTimes,
} from '@fortawesome/free-solid-svg-icons';
import Backdrop from 'components/UI/Backdrop';

import styles from './styles.module.scss';

export default function Modal() {
	return (
		<Backdrop>
			<div className={styles.modal}>
				<div className={styles.content}>
					<div className={styles.iconWrapper}>
						<div className={styles.icon}>
							<FontAwesomeIcon icon={faTimes} />
						</div>
					</div>
					<div className={styles.textWrapper}>
						<div className={styles.errorIcon}>
							<FontAwesomeIcon icon={faExclamationTriangle} />
						</div>
						<h3>Error</h3>
						<p>Something wrong happened with your request</p>
					</div>
				</div>
			</div>
		</Backdrop>
	);
}
