"use client"
import styles from './page.module.css'
import BigTotalCounter from 'app/components/BigTotalCounter'
import Dropdown from 'app/components/Dropdown'
import PersonalCounter from 'app/components/PersonalCounter'
import Leaderboard from 'app/components/Leaderboard'
import { useEffect, useState } from 'react'
import { getUsers, incrementScoreByName } from '../../firebase/firestore'

type Player = {
	name: string
	score: number
}

export default function Home() {
	const [players, setPlayers] = useState<{ name: string; score: number }[]>([])
	const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null)
	const [totalScore, setTotalScore] = useState(0)

	useEffect(() => {
		const fetchUsers = async () => {
			const users = await getUsers()
			setPlayers(users)

			// Calculate the total score
			const total = users.reduce((acc, user) => acc + user.score, 0)
			setTotalScore(total)
		}

		fetchUsers()
	}, [])

	const handleSelectPlayer = (name: string) => {
		const player = players.find((p) => p.name === name)
		if (player) {
			setSelectedPlayer(player)
		}
	}

	const handleIncrement = async () => {
		if (selectedPlayer) {
			await incrementScoreByName(selectedPlayer.name)

			// Update the selected player's score locally
			const updatedPlayers = players.map((p) =>
				p.name === selectedPlayer.name ? { ...p, score: p.score + 1 } : p
			)
			setPlayers(updatedPlayers)

			// Update the total score
			const newTotal = updatedPlayers.reduce((acc, user) => acc + user.score, 0)
			setTotalScore(newTotal)

			// Update the selected player in state
			setSelectedPlayer((prev) =>
				prev ? { ...prev, score: prev.score + 1 } : null
			)
		}
	}

	return (
		<main className={styles.main}>
			<BigTotalCounter
				total={totalScore}
				max={1000}
			/>

			<Dropdown
				players={players.map((player) => player.name)}
				onSelect={handleSelectPlayer}
			/>

			<PersonalCounter
				score={selectedPlayer ? selectedPlayer.score : 0}
				onIncrement={handleIncrement}
			/>

			<Leaderboard users={players} />
		</main>
	)
}
