import { BASE_URL, POISON_ARRAY } from '@/constants';

export default class API {
	constructor() {
		this.makeRequest = this.makeRequest.bind(this);
		this.login = this.login.bind(this);
		this.logout = this.logout.bind(this);
		this.storeCookie = this.storeCookie.bind(this);
		this.getCookie = this.getCookie.bind(this);
		this.getUsers = this.getUsers.bind(this);
		this.getUser = this.getUser.bind(this);
	}
	async makeRequest(secret: string): Promise<number | null> {
		try {
			const response = await fetch(`${BASE_URL}/secrets/${secret}.json`);
			if (!response.ok) {
				throw new Error("Failed to fetch secret");
			}
			const data = await response.json();
			if (!data) {
				throw new Error("Invalid secret data");
			}
			return data;
		} catch (error) {
			console.error("Error fetching secret:", error);
			throw error;
		}
	};
	
	async login(payload: { email: string, password: string }) {
		const { email, password } = payload;

		try {
			const encoded = _encode(email, password);
			const data = await this.makeRequest(encoded);

			if (!data) {
				throw new Error("Invalid credentials");
			}

			await this.storeCookie(encoded);
			return data;

		} catch (error) {
			console.error("Error during login:", error);
			throw error;
		}
	}

	async logout(){
		try {
			document.cookie = "testUserId=; path=/; max-age=0; secure; samesite=strict";
		} catch (e) {
			console.error("Error during logout:", e);
			throw e;
		}
	}

	async storeCookie(cookie: string) {
		try {
			document.cookie = `testUserId=${cookie}; path=/; max-age=86400; secure; samesite=strict`;
		} catch (e) {
			console.error("Error storing cookie:", e);
			throw e;
		}
	}

	async getCookie() {
		try {
			const cookieValue = document.cookie.split('; ').find(row => row.startsWith('testUserId='));
			if (cookieValue) {
				return cookieValue.split('=')[1];
			} else {
				return null;
			}
		} catch (e) {
			console.error("Error retrieving cookie:", e);
			throw e;
		}
	}

	async getUsers() {
		try {
			const response = await fetch(`${BASE_URL}/users.json`);
			if (!response.ok) {
				throw new Error("Failed to fetch users");
			}
			const data = await response.json();

			if (!data) {
				throw new Error("Invalid users data");
			}

			return data;

		} catch (e) {
			console.error("Error fetching users:", e);
			throw e;
		}
	}

	// assumed this would work but that would be too easy
	async getUser(id: string) {
		try {
			const response = await fetch(`${BASE_URL}/users/${id}.json`);
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
