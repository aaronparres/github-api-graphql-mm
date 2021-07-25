import { ReactComponent as Logo } from 'assets/svg/logo.svg';

import styles from './styles.module.scss';

export default function Footer() {
	return (
		<footer className={styles.footer}>
			<Logo className={styles.logo} />
			<div className={styles.terms}>
				<p className={styles.terms__element}>Privacy Policy</p>
				<p className={styles.terms__element}>Cookies Policy</p>
				<p className={styles.terms__element}>GraphQL Info</p>
				<p className={styles.terms__element}>Help</p>
				<p className={styles.terms__element}>About React Issues</p>
			</div>
		</footer>
	);
}
