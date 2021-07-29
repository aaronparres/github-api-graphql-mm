import styles from './styles.module.scss';

interface CardProps {
	children: React.ReactNode;
	click: () => void;
}

export default function Card({ children, click }: CardProps) {
	return (
		<div onClick={click} className={styles.card}>
			{children}
		</div>
	);
}
