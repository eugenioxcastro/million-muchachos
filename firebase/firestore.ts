import {
	addDoc,
	collection,
	doc,
	getDocs,
	orderBy,
	query,
	updateDoc,
	where,
} from 'firebase/firestore'
import { db } from './firebase'

const USERS = 'users'

// Adds a user to the Firestore 'users' collection
export async function addUser(uid: string, name: string, score: number) {
	try {
		await addDoc(collection(db, USERS), {
			uid,
			name,
			score,
		})
		console.log('Document successfully written!')
	} catch (e) {
		console.error('Error adding document: ', e)
	}
}

// Fetches users based on the UID and orders them by score
export async function getUsers(): Promise<{ name: string, score: number }[]> {
	try {
		const usersQuery = query(
			collection(db, 'users'),
			orderBy('score', 'desc')
		)
		const querySnapshot = await getDocs(usersQuery)
		const users = querySnapshot.docs.map((doc) => doc.data() as { name: string, score: number })
		return users
	} catch (e) {
		console.error('Error getting documents: ', e)
		return []
	}
}


export async function incrementScoreByName(name: string) {
	try {
		// Query the users collection to find the document with the matching name
		const usersQuery = query(collection(db, 'users'), where('name', '==', name))
		const querySnapshot = await getDocs(usersQuery)

		if (!querySnapshot.empty) {
			// Assuming there's only one document with the given name
			const userDocRef = querySnapshot.docs[0].ref
			const currentScore = querySnapshot.docs[0].data().score || 0
			await updateDoc(userDocRef, { score: currentScore + 1 })
			console.log(`Score for ${name} successfully incremented!`)
		} else {
			console.log(`No matching documents found for the name: ${name}`)
		}
	} catch (e) {
		console.error('Error updating document: ', e)
	}
}
