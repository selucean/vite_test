import { ERequestStatus, type TManager as TParsedUser, type TUser } from '@/lib/types';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type TUsersState = {
	cachedData: TUser[] | null,
	status: ERequestStatus;
	users: TParsedUser[];
};

const initialState: TUsersState = {
	cachedData: null,
	status: ERequestStatus.INIT,
	users: [],
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
		[EUsersAction.GET_USERS_SUCCESS](state, action: PayloadAction<{ parsedUsers: TParsedUser[], users: TUser[] }>) {
			state.status = ERequestStatus.FULFILLED;
			state.users = action.payload.parsedUsers;
			state.cachedData = action.payload.users;
		},
		[EUsersAction.GET_USERS_REJECTED](state) {
			state.status = ERequestStatus.REJECTED;
			state.users = [];
		},
	},
	selectors: {
		getCachedData: (state) => state.cachedData,
		getUser: (state, id: number) => state.cachedData?.find(user => user.id === id),
		getUsers: (state) => state.users,
		getStatus: (state) => state.status,
	},
});

export default usersSlice;
