import styles from './PersonalCounter.module.css'

interface PersonalCounterProps {
	score: number
	onIncrement: () => void
}

export default function PersonalCounter({
	score,
	onIncrement,
}: PersonalCounterProps) {
	return (
		<div className={styles.personalCounter}>
			<span className={styles.score}>{score}</span>
			<button
				className={styles.incrementButton}
				onClick={onIncrement}
			>
				+
			</button>
		</div>
	)
}
