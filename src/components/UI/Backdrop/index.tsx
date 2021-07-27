import styles from './styles.module.scss';

interface BackdropProps {
	children: React.ReactNode;
	onClose?: () => void;
}

export default function Backdrop({ children, onClose }: BackdropProps) {
	return (
		<div className={styles.backdrop} onClick={onClose}>
			{children}
		</div>
	);
}
