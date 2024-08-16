import styles from './Leaderboard.module.css'

interface User {
	name: string
	score: number
}

interface LeaderboardProps {
	users: User[]
}

export default function Leaderboard({ users }: LeaderboardProps) {
	return (
		<div className={styles.leaderboard}>
			<h2 className={styles.title}>Top Pisteadores</h2>
			<ul className={styles.list}>
				{users.map((user, index) => (
					<li
						key={user.name}
						className={styles.item}
					>
						<span className={styles.rank}>{index + 1}</span>
						<span className={styles.name}>{user.name}</span>
						<span className={styles.score}>{user.score}</span>
					</li>
				))}
			</ul>
		</div>
	)
}
