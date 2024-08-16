import styles from './BigTotalCounter.module.css'

interface BigTotalCounterProps {
	total: number
	max: number
}

export default function BigTotalCounter({ total, max }: BigTotalCounterProps) {
	return (
		<div className={styles.counterContainer}>
			<div className={styles.counter}>
				<span className={styles.total}>{total}</span>
				<span className={styles.separator}>/</span>
				<span className={styles.max}>{max}</span>
				<span className={styles.beerEmoji}>🍺</span>
				<span className={styles.beerText}>BEERS</span>
			</div>
		</div>
	)
}
