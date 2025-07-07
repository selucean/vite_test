import { ERequestStatus, type TManager } from '@/lib/types';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type TUsersState = {
	users: TManager[];
	status: ERequestStatus;
};

const initialState: TUsersState = {
	users: [],
	status: ERequestStatus.INIT,
};

export enum EUsersAction {
	GET_USERS = 'GET_USERS',
	GET_USERS_SUCCESS = 'GET_USERS_SUCCESS',
	GET_USERS_REJECTED = 'GET_USERS_REJECTED',	
}

const usersSlice = createSlice({
	name: '@users',
	initialState,
	reducers: {
		[EUsersAction.GET_USERS](state) {
			state.status = ERequestStatus.PENDING;
		},
		[EUsersAction.GET_USERS_SUCCESS](state, action: PayloadAction<{ users: TManager[] }>) {
			state.status = ERequestStatus.FULFILLED;
			state.users = action.payload.users;
		},
		[EUsersAction.GET_USERS_REJECTED](state) {
			state.status = ERequestStatus.REJECTED;
			state.users = [];
		},
	},
	selectors: {
		getUser: (state, id: number) => state.users.find(user => user.id === id),
		getUsers: (state) => state.users,
		getStatus: (state) => state.status,
	},
});

export default usersSlice;
