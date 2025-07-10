import { useAppDispatch, useAppSelector } from '@/lib/store';
import { ERequestStatus } from '@/lib/types';
import authSlice, { EAuthAction } from '@/slices/authSlice';
import usersSlice from '@/slices/usersSlice';
import { LoaderCircle } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router';

export default function Header() {
	const dispatch = useAppDispatch();
	const status = useAppSelector(authSlice.selectors.getStatus);
	const id = useAppSelector(authSlice.selectors.getAuthId);
	const isAuthenticated = useAppSelector(authSlice.selectors.getIsAuthenticated);
	const userData = useAppSelector(state => usersSlice.selectors.getUser(state, id ? id : 0));


	const navigate = useNavigate();
	const { pathname } = useLocation();

	const handleLogout = () => {
		dispatch(authSlice.actions[EAuthAction.LOGOUT]())
		navigate("/", { replace: true });
	}

	return (
		<header className="sticky top-0 bg-violet-50 p-4 flex justify-between items-center shadow shadow-violet-100">
			<h1 className='text-xl font-semibold text-violet-900'>
				{
					pathname === "/"
						? "Login"
						: "Hierarchy"
				}
			</h1>
			<div className='flex flex-row items-end gap-8'>
				{
					userData && isAuthenticated && status === ERequestStatus.FULFILLED
						? (
							<>
								<p className='text-balance text-md h-auto'>{userData.firstName} {userData.lastName}</p>
								<button
									onClick={handleLogout}
									className='border border-violet-200 rounded-sm px-4 py-0.5 cursor-pointer bg-transparent hover:bg-violet-200 transition-colors duration-300'
								>
									<span>Logout</span>
								</button>
							</>
						)
						: (status === ERequestStatus.PENDING)
							? (
								<>
									<div className='w-28 h-6 bg-violet-100 rounded-sm animate-pulse' />
									<button
										disabled={true}
										className='border border-gray-400 rounded-sm px-8 py-1.5 bg-transparent'
									>
										<LoaderCircle size={16} className='animate-spin text-gray-500' />
									</button>
								</>
							) : null
				}
			</div>
		</header>
	);
}
