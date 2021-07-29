import styles from './styles.module.scss';

interface StatusBadgeProps {
	text: string;
	click: (arg: string) => void;
}

export default function StatusBadge({ text, click }: StatusBadgeProps) {
	return (
		<div className={styles.state} onClick={() => click(text)}>
			<span>{text}</span>
		</div>
	);
}
