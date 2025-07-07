import { useAppDispatch, useAppSelector } from '@/lib/store';
import { ERequestStatus } from '@/lib/types';
import authSlice, { EAuthAction } from '@/slices/authSlice';
import usersSlice from '@/slices/usersSlice';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

export default function Header() {
	const dispatch = useAppDispatch();
	const status = useAppSelector(authSlice.selectors.getStatus);
	const user = useAppSelector(authSlice.selectors.getAuthUser);
	const id = useAppSelector(authSlice.selectors.getAuthId);
	const isAuthenticated = useAppSelector(authSlice.selectors.getIsAuthenticated);

	const userData = useAppSelector(state => usersSlice.selectors.getUser(state, id ? id : 0));

	const navigate = useNavigate();

	const handleLogout = () => {
		dispatch(authSlice.actions[EAuthAction.LOGOUT]())
		navigate("/", { replace: true });		
	}

	return (
		<header className="sticky top-0 border border-b-gray-200 p-4 flex flex-row items-end">
			{
				userData && isAuthenticated
					? <span>{userData.firstName} {userData.lastName}</span>
					: null
			}
			{
				isAuthenticated
					? <button
						onClick={handleLogout}
						disabled={status === ERequestStatus.PENDING}
						className='border border-gray-400 rounded-sm px-2 py-1 cursor-pointer bg-transparent hover:bg-gray-300 transition-all duration-150'
					>
						<span>Logout</span>
					</button>
					: null
			}
		</header>
	);
}