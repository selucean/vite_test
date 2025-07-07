import { all } from "typed-redux-saga";
import authSaga from './authSaga';
import usersSaga from './usersSaga';

function* rootSaga() {
	yield all([
		authSaga(),
		usersSaga(),
	]);
}

export default rootSaga;
