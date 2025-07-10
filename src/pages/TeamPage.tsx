import { ItemPreloader } from '@/components/ItemPreloader';
import { ManagerItem } from '@/components/ManagerItem';
import { useAppDispatch, useAppSelector } from '@/lib/store';
import { ERequestStatus } from '@/lib/types';
import authSlice, { EAuthAction } from '@/slices/authSlice';
import usersSlice, { EUsersAction } from '@/slices/usersSlice';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';


export default function TeamPage() {
	const dispatch = useAppDispatch();
	const users = useAppSelector(usersSlice.selectors.getUsers);
	const status = useAppSelector(usersSlice.selectors.getStatus);
	const authStatus = useAppSelector(authSlice.selectors.getStatus);
	const userStatus = useAppSelector(usersSlice.selectors.getStatus);
	const isAuthenticated = useAppSelector(authSlice.selectors.getIsAuthenticated);
	const navigate = useNavigate();

	useEffect(() => {
		if (
			authStatus === ERequestStatus.FULFILLED && !isAuthenticated ||
			authStatus === ERequestStatus.REJECTED
		) {
			dispatch(authSlice.actions[EAuthAction.LOGOUT]());
			navigate('/', { replace: true });
		}
	}, [authStatus, isAuthenticated]);

	useEffect(() => {
		if (
			authStatus === ERequestStatus.FULFILLED &&
			isAuthenticated &&
			(userStatus === ERequestStatus.INIT || users.length === 0)
		) {
			dispatch(usersSlice.actions[EUsersAction.GET_USERS]());
		}
	}, [authStatus, isAuthenticated, userStatus, users.length]);

	if (authStatus === ERequestStatus.INIT) {
		return null;
	}

	return (
		<div className='lg:w-2xl'>
			<ul className='grid gap-4'>
				{
					status !== ERequestStatus.FULFILLED
						? Array.from({ length: 5 }).map((_, index) => <ItemPreloader key={index} />)
						: users.map((user) => {
							return <ManagerItem key={user.id} data={user} />;
						})
				}
			</ul>
		</div>
	);
}
