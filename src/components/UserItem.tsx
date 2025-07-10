import type { TUser } from '@/lib/types';
import { Minus } from 'lucide-react';
import { Suspense, useState, type ReactNode } from 'react';
import { InitialsPlaceholder } from './InitialsPlaceholder';

export const UserItem = ({
	data,
	icon = <Minus size={16} className='text-gray-500' />,
	onClick
}: {
	data: TUser,
	icon?: ReactNode,
	onClick?: () => void
}) => {
	const [showImage, setShowImage] = useState(true);

	const handleImageError = () => {
		setShowImage(false);
	}

	return (
		<div className='flex flex-row items-center gap-2'>
			<div onClick={onClick}>
				{icon}
			</div>
			<>
				{
					data.photo && showImage
						? (
							<Suspense fallback={
								<InitialsPlaceholder initials={data.initials} />
							}>
								<img
									onError={handleImageError}
									src={data.photo}
									alt={data.firstName + ' ' + data.lastName}
									loading='lazy'
									className='w-8 h-8 rounded-full object-cover border text-violet-400'
								/>
							</Suspense>
						) : (
							<InitialsPlaceholder initials={data.initials} />
						)
				}
				<p className='font-normal text-left'>{data.firstName} {data.lastName} <span className='font-medium'>({data.email})</span></p>
			</>
		</div>
	);
}