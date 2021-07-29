import { Maybe } from 'hooks/apihooks';

import PaginationButton from './PaginationButton';

import styles from './styles.module.scss';

interface PaginationButtonRowProps {
	hasPrevious: boolean;
	hasNext: boolean;
	startCursor: Maybe<string>;
	endCursor: Maybe<string>;
	changePageHandler: (argOne: Maybe<string>, argTwo: string) => void;
}

export default function PaginationButtonRow({
	hasPrevious,
	hasNext,
	startCursor,
	endCursor,
	changePageHandler,
}: PaginationButtonRowProps) {
	return (
		<div className={styles.buttonRowContainer}>
			{hasPrevious && (
				<span className={styles.previousButton}>
					<PaginationButton
						click={() => changePageHandler(startCursor, 'before')}
						text="Previous"
						iconLeft
					/>
				</span>
			)}
			{hasNext && (
				<PaginationButton
					click={() => changePageHandler(endCursor, 'after')}
					text="Next"
					iconRight
				/>
			)}
		</div>
	);
}
