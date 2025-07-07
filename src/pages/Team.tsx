import { useAppDispatch, useAppSelector } from '@/lib/store';
import { ERequestStatus, type TManager, type TUser } from '@/lib/types';
import usersSlice, { EUsersAction } from '@/slices/usersSlice';
import { Plus, Minus } from "lucide-react"
import { Suspense, useEffect, useState, type ReactNode } from 'react';

const ManagerItem = ({ data}: { data: TManager }) => {
	const [isOpen, setIsOpen] = useState(true);

	const { teamMembers, ...manager } = data;

	const handleCollapse = () => {
		setIsOpen(!isOpen);
	}
	return (
		<div className='manager-item'>
			<div 
			className='manager-item-trigger cursor-pointer px-2 py-1 rounded-sm bg-transparent hover:bg-gray-200 transition-all duration-300'
			 onClick={handleCollapse}
			 >
				<UserItem data={manager} icon={<Plus size={16} className='text-gray-500' />} />
			</div>
			<div className={`manager-item-content grid gap-2 pl-8 transition-all duration-300 ${isOpen ? 'open' : ''}`}>
				{
					isOpen && teamMembers.map((user) => (
						<UserItem key={user.id} data={user} />
					))
				}
			</div>
		</div>
	);
}

const InitialsPlaceholder = ({
	initials
}: {
	initials: string
}) => (
	<div className='w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center'>
		<span className='text-gray-600'>
			{initials}
		</span>
	</div>
)

const UserItem = ({
	data,
	icon = <Minus size={16} className='text-gray-500' />
}: {
	data: TUser,
	icon?: ReactNode
}) => {
	const [showImage, setShowImage] = useState(true);

	const handleImageError = () => {
		setShowImage(false);
	}

	return (
		<div className='flex flex-row items-center gap-2'>
			{icon}
			<>
				{
					data.photo && showImage
						? (
							<Suspense fallback={<InitialsPlaceholder initials={data.initials} />}>
								<img
								onError={handleImageError}
									src={data.photo}
									alt={data.firstName + ' ' + data.lastName}
									loading='lazy'
									className='w-8 h-8 rounded-full'
								/>
							</Suspense>
						) : (
							<InitialsPlaceholder initials={data.initials} />
						)
				}
				<span>{data.firstName} {data.lastName} ({data.email})</span>
			</>
		</div>
	);
}


export default function Team() {
	const dispatch = useAppDispatch();
	const users = useAppSelector(usersSlice.selectors.getUsers);
	const status = useAppSelector(usersSlice.selectors.getStatus);

	useEffect(() => {
		if (status === ERequestStatus.INIT || users.length === 0) {
			dispatch(usersSlice.actions[EUsersAction.GET_USERS]());
		}
	}, [status]);

	if (!users) {
		return null;
	}

	return (
		<div className='w-2xl'>
			<div className='grid gap-2'>
			{
				status === ERequestStatus.FULFILLED
					? users.map((user) => {
						return <ManagerItem key={user.id} data={user} />;
					})
					: null
			}
			</div>
		</div>
	);
}