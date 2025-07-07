import type { PayloadAction } from "@reduxjs/toolkit";
import { call, getContext, put, takeEvery, takeLatest } from "typed-redux-saga";
import authSlice, { EAuthAction } from "../slices/authSlice";

function* handleLogin(action: PayloadAction<{ email: string, password: string }>) {
	const API = yield* getContext("API");

	try {
		const { email, password } = action.payload;
		const data = yield* call(API.login, { email, password })
		if (!data) {
			yield* put(authSlice.actions[EAuthAction.LOGIN_REJECTED]());
		}

		console.log("Login successful", data);

		yield* put(authSlice.actions[EAuthAction.LOGIN_SUCCESS](
			data
		));
	} catch (e: unknown) {
		console.error("An error occurred at login", e)
		yield* put(authSlice.actions[EAuthAction.LOGIN_REJECTED]());
	}
}

function* handleLogout() {
	console.log("Logging out");
	const API = yield* getContext("API");

	try {
		yield* call(API.logout);
	} catch (e: unknown) {
		console.error("An error occurred at logout", e);
	}
}

function* authSaga() {
	yield takeEvery(authSlice.actions[EAuthAction.LOGIN].type, handleLogin);
	yield takeLatest(authSlice.actions[EAuthAction.LOGOUT].type, handleLogout);
}

export default authSaga;
