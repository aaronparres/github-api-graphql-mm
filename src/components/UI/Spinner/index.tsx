import Backdrop from '../Backdrop';
import styles from './styles.module.scss';

export default function Spinner() {
	return (
		<Backdrop>
			<div className={styles.container}>
				<div className={styles.spinner}></div>
			</div>
		</Backdrop>
	);
}
