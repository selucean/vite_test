import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { ERequestStatus, type TUser } from '@/lib/types';

type TInitialState = {
	user: TUser | null,
	isAuthenticated: boolean,
	status: ERequestStatus
}

const initialState: TInitialState = {
	user: null,
	isAuthenticated: false,
	status: ERequestStatus.INIT
}

export enum EAction {
	LOGIN = "LOGIN",
	LOGIN_SUCCESS = "LOGIN_SUCCESS",
	LOGIN_REJECTED = "LOGIN_REJECTED"
}

const authSlice = createSlice({
	name: "@auth",
	initialState,
	reducers: {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		[EAction.LOGIN](state, action: PayloadAction<{ email: string, password: string }>) {
			state.status = ERequestStatus.PENDING
		},
		[EAction.LOGIN_SUCCESS](state, action: PayloadAction<TUser>) {
			state.status = ERequestStatus.FULFILLED
			state.user = action.payload
			state.isAuthenticated = true
		},
		[EAction.LOGIN_REJECTED](state) {
			state.status = ERequestStatus.REJECTED
			state.user = null
			state.isAuthenticated = false
		}
	},
	selectors: {
		getIsAuthenticated: state => state.isAuthenticated,
		getStatus: state => state.status,
		getUser: state => state.user
	}
})

export default authSlice;
