import type { PayloadAction } from "@reduxjs/toolkit";
import { all, call, getContext, put, takeEvery } from "typed-redux-saga";
import authSlice, { EAuthAction } from "../slices/authSlice";

function* handleLogin(action: PayloadAction<{ email: string, password: string }>) {
	try {
		const API = yield* getContext("API");
		const { email, password } = action.payload;
		const data = yield* call(API.login, { email, password })

		if (data) {
			yield* put(authSlice.actions[EAuthAction.LOGIN_SUCCESS](
				data
			));
		}
	} catch (e: unknown) {
		console.error("An error occurred at login", e)
		yield* put(authSlice.actions[EAuthAction.LOGIN_REJECTED]());
	}
}

function* checkAuth() {
	const API = yield* getContext("API");
	try {
		const data = yield* call(API.getCookie);

		if (!data) {
			yield* put(authSlice.actions[EAuthAction.LOGIN_REJECTED]());
			return;
		}

		const userId = yield* call(API.makeRequest, data);

		if (userId) {
			yield* put(authSlice.actions[EAuthAction.LOGIN_SUCCESS](userId));
		} else {
			yield* put(authSlice.actions[EAuthAction.LOGIN_REJECTED]());
		}
	} catch (e: unknown) {
		console.error("An error occurred while retrieving user info", e);
		yield* put(authSlice.actions[EAuthAction.LOGIN_REJECTED]());
	}
}

function* handleLogout() {
	const API = yield* getContext("API");
	try {
		yield* call(API.logout);
	} catch (e: unknown) {
		console.error("An error occurred at logout", e);
	}
}

function* authSaga() {
	all([
		yield* takeEvery(authSlice.actions[EAuthAction.LOGIN].type, handleLogin),
		yield* takeEvery(authSlice.actions[EAuthAction.LOGOUT].type, handleLogout),
		yield* takeEvery(authSlice.actions[EAuthAction.GET_USER_INFO].type, checkAuth)
	]);
}

export default authSaga;
