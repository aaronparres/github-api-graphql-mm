import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

import styles from './styles.module.scss';

interface NavbarElementProps {
	icon: IconProp;
	text: string;
	color: string;
	titleStyles?: string;
}

export default function NavbarElement({
	icon,
	text,
	color,
	titleStyles,
}: NavbarElementProps) {
	return (
		<>
			<div className={styles.iconWrapper}>
				<FontAwesomeIcon icon={icon} color={color} />
			</div>
			<p className={titleStyles}>{text}</p>
		</>
	);
}
