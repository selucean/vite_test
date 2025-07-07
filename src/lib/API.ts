import { POISON_ARRAY } from '@/constants';
import { parseData } from './parser';

export default class API {
	async login(payload: { email: string, password: string }) {
		const { email, password } = payload;

		try {
			const encoded = _encode(email, password);
			const response = await fetch(`https://gongfetest.firebaseio.com/secrets/${encoded}.json`);

			if (!response.ok) {
				throw new Error("Login failed");
			}

			const data = await response.json();

			return data;

		} catch (error) {
			console.error("Error during login:", error);
			throw error;
		}
	}

	async logout(){
		// Placeholder for logout logic
	}

	async getUsers() {
		try {
			const response = await fetch("https://gongfetest.firebaseio.com/users.json");
			if (!response.ok) {
				throw new Error("Failed to fetch users");
			}
			const data = await response.json();

			return parseData(data);

		} catch (e) {
			console.error("Error fetching users:", e);
			throw e;
		}
	}

	// assumed this would work but that would be too easy
	async getUser(id: string) {
		try {
			const response = await fetch(`https://gongfetest.firebaseio.com/users/${id}.json`);
			if (!response.ok) {
				throw new Error("Failed to fetch user");
			}

			const data = await response.json();

			return data;
		} catch (e) {
			console.error("Error fetching user:", e);
			throw e;
		}
	}

}

function _make32(inputString: string) {
	const targetLength = 32;
	let resultString = "";
	while (resultString.length < targetLength) {
		resultString += inputString;
	}
	resultString = resultString.substring(0, targetLength);
	return Array.from(resultString, (char) => char.charCodeAt(0));
}

function _encode(email: string, password: string) {
	const emailChars = _make32(email);
	const passwordChars = _make32(password);
	let encodedResult = "";
	for (let i = 0; i < 32; ++i) {
		const index = (emailChars[i] ^ passwordChars[i]) & 0xff;
		const value = POISON_ARRAY[index];
		encodedResult += value.toString(16).padStart(2, "0").toUpperCase();
	}
	return encodedResult;
}
