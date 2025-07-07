import { useEffect, useState } from 'react';
import { EInputKind, ERequestStatus } from '@/lib/types';
import { useAppDispatch, useAppSelector } from '@/lib/store';
import authSlice, { EAuthAction } from '@/slices/authSlice';
import { UiInput } from '@/components/UiInput';
import { useNavigate } from 'react-router';
import usersSlice, { EUsersAction } from '@/slices/usersSlice';


export default function LoginForm() {
	const dispatch = useAppDispatch();
	const isAuthenticated = useAppSelector(authSlice.selectors.getIsAuthenticated);
	const authStatus = useAppSelector(authSlice.selectors.getStatus);

	const navigate = useNavigate();

	const [error, setError] = useState<string | null>(null);
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError(null);
		if (!email || !password) {
			setError("Email and password are required.");
			return;
		}

		dispatch(authSlice.actions[EAuthAction.LOGIN]({ email, password }))
	}

	useEffect(() => {
		if (isAuthenticated && authStatus === ERequestStatus.FULFILLED) {
			dispatch(usersSlice.actions[EUsersAction.GET_USERS]());
			
			navigate("/team");
		}
	}, [isAuthenticated, authStatus]);

	return (
		<div className='grid grid-cols-6 mx-auto w-3xl bg-gray-300 rounded-2xl py-10 shadow'>
			<h2 className='col-span-6 text-center text-slate-600 font-bold mb-4'>
				Login
			</h2>
			<form
				onSubmit={handleSubmit}
				onError={(e) => {
					e.preventDefault();
					setError("An error occurred during form submission.");
				}}
				className='flex flex-col col-span-4 col-start-2 w-full gap-y-2 py-3 px-2'
			>
				<UiInput
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					kind={error ? EInputKind.ERROR : EInputKind.DEFAULT}
					id="email" type="email" placeholder="Email"
				/>
				<UiInput
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					kind={error ? EInputKind.ERROR : EInputKind.DEFAULT}
					id="password" type="password" placeholder="Password"
				/>

				<button
					type='submit'
					className='bg-slate-600 text-white rounded-sm p-2 hover:bg-red-500 transition-colors duration-200 mt-4 mx-auto px-8'>
					Submit
				</button>
			</form>
		</div>
	)
};
