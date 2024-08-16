"use client"
import { useState } from 'react'
import styles from './Dropdown.module.css'

interface DropdownProps {
	players: string[]
	onSelect: (player: string) => void
}

export default function Dropdown({ players, onSelect }: DropdownProps) {
	const [selectedPlayer, setSelectedPlayer] = useState('')

	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedPlayer(e.target.value)
		onSelect(e.target.value)
	}

	return (
		<div className={styles.dropdownContainer}>
			<select
				className={styles.dropdown}
				value={selectedPlayer}
				onChange={handleChange}
			>
				<option value="">Select a player</option>
				{players.map((player, index) => (
					<option
						key={index}
						value={player}
					>
						{player}
					</option>
				))}
			</select>
		</div>
	)
}
