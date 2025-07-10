import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { ERequestStatus, type TUser } from '@/lib/types';

type TInitialState = {
	id: number | null;
	user: TUser | null,
	isAuthenticated: boolean,
	status: ERequestStatus
}

const initialState: TInitialState = {
	id: null,
	user: null,
	isAuthenticated: false,
	status: ERequestStatus.INIT
}

export enum EAuthAction {
	LOGIN = "LOGIN",
	LOGIN_SUCCESS = "LOGIN_SUCCESS",
	LOGIN_REJECTED = "LOGIN_REJECTED",

	LOGOUT = "LOGOUT",
	SET_USER = "USER",
	GET_USER_INFO = "GET_USER_INFO"
}

const authSlice = createSlice({
	name: "@auth",
	initialState,
	reducers: {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		[EAuthAction.LOGIN](state, action: PayloadAction<{ email: string, password: string }>) {
			state.status = ERequestStatus.PENDING
		},
		[EAuthAction.GET_USER_INFO](state) {
			state.status = ERequestStatus.PENDING;
		},
		[EAuthAction.LOGIN_SUCCESS](state, action: PayloadAction<number>) {
			state.status = ERequestStatus.FULFILLED
			state.id = action.payload
			state.isAuthenticated = true
		},
		[EAuthAction.LOGIN_REJECTED](state) {
			state.status = ERequestStatus.REJECTED
			state.user = null
			state.isAuthenticated = false
		},
		[EAuthAction.LOGOUT](state){
			state.status = ERequestStatus.INIT
			state.user = null;
			state.isAuthenticated = false
		},
	},
	selectors: {
		getIsAuthenticated: state => state.isAuthenticated,
		getStatus: state => state.status,
		getAuthUser: state => state.user,
		getAuthId: state => state.id,
	}
})

export default authSlice;
