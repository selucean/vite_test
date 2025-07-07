import { parseData } from '@/lib/parser';
import usersSlice, { EUsersAction } from '@/slices/usersSlice';
import { call, getContext, put, takeEvery } from 'typed-redux-saga';

function* getUsers() {
	const API = yield* getContext("API");
	
	try {
		const users = yield* call(API.getUsers);
		if (!users || !Array.isArray(users)) {
			throw new Error("Invalid users data");
		}

		yield* put(usersSlice.actions[EUsersAction.GET_USERS_SUCCESS]({
			parsedUsers: parseData(users),
			users: users
		}));

	} catch (error) {
		console.error("An error occurred while fetching users", error);
		yield* put(usersSlice.actions[EUsersAction.GET_USERS_REJECTED]());
	}
}

function* usersSaga() {
	yield* takeEvery(usersSlice.actions[EUsersAction.GET_USERS].type, getUsers);
}

export default usersSaga;