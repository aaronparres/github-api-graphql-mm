import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

import styles from './styles.module.scss';

interface InputProps {
	type: string;
	placeholder: string;
	value: string;
	icon: IconProp;
	inputHandler: (e: string) => void;
}

export default function Input({
	type,
	placeholder,
	value,
	icon,
	inputHandler,
}: InputProps) {
	return (
		<>
			<input
				className={styles.input}
				type={type}
				placeholder={placeholder}
				value={value}
				onChange={(e) => inputHandler(e.target.value)}
			/>
			<button type="submit" className={styles.submitButton}>
				<FontAwesomeIcon icon={icon} />
			</button>
		</>
	);
}
