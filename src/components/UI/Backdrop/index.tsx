import { useAppDispatch } from 'hooks/redux';
import { showErrorModal } from 'store/slices/settings';

import styles from './styles.module.scss';

interface BackdropProps {
	children: React.ReactNode;
}

export default function Backdrop({ children }: BackdropProps) {
	const dispatch = useAppDispatch();
	return (
		<div
			className={styles.backdrop}
			onClick={() => dispatch(showErrorModal(false))}
		>
			{children}
		</div>
	);
}
