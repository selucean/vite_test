import type { TParsedUser } from '@/lib/types';
import { UserItem } from '@/components/UserItem';
import { useState } from 'react';
import { Plus } from 'lucide-react';

export const ManagerItem = ({ data }: { data: TParsedUser }) => {
	const [isOpen, setIsOpen] = useState(true);

	const { teamMembers, ...manager } = data;

	const handleCollapse = () => {
		setIsOpen(!isOpen);
	}
	return (
		<li>
			<div
				className='manager-item-trigger px-2 py-1 rounded-sm bg-transparent hover:bg-gray-200 transition-all duration-300'
			>
				<UserItem
					data={manager}
					icon={
						<Plus size={16} className='text-gray-500 cursor-pointer' />
					}
					onClick={handleCollapse}
				/>
			</div>
			<ul className={`manager-item-content grid gap-4 pl-4 lg:pl-8 pt-2 transition-all duration-300 ${isOpen ? 'open' : ''}`}>
				{
					isOpen && teamMembers.map((user) => {
						if (user.managerId) {
							return <ManagerItem key={user.id} data={user as TParsedUser} />
						}
						return <UserItem onClick={handleCollapse} key={user.id} data={user} />
					})
				}
			</ul>
		</li>
	);
}
