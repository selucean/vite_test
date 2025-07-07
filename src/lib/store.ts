import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import API from '@/lib//API';
import rootSaga from '@/sagas';
import authSlice from '@/slices/authSlice';
import { useDispatch, useSelector, useStore } from 'react-redux';
import usersSlice from '@/slices/usersSlice';

const initStore = () => {
	const sagaMiddleware = createSagaMiddleware<{ API: API }>({
		context: {
			API: new API()
		}
	});

	const store = configureStore({
		reducer: {
			"@auth": authSlice.reducer,
			"@users": usersSlice.reducer
		},
		middleware: (getDefaultMiddleware) => getDefaultMiddleware({
			thunk: false,
		}).concat(sagaMiddleware),
	});

	sagaMiddleware.run(rootSaga);

	return store;
}

export const store = initStore();


export type TAppStore = ReturnType<typeof initStore>;
export type TRootState = ReturnType<TAppStore["getState"]>;
export type TAppDispatch = TAppStore["dispatch"];

export const useAppDispatch = useDispatch.withTypes<TAppDispatch>();
export const useAppSelector = useSelector.withTypes<TRootState>();
export const useAppStore = useStore.withTypes<TAppStore>();
