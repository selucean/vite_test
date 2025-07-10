import { Minus, Plus } from 'lucide-react';

export const ItemPreloader = () => {
	return (
		<li className='animate-pulse'>
			<div className='flex flex-row items-center px-2 py-1 gap-2'>
				<Plus size={16} className='text-gray-500' />
				<div className='w-8 h-8 bg-violet-200 rounded-full flex items-center justify-center border-1 border-violet-400' />
				<span className='h-8 w-60 bg-gray-200 rounded-sm' />
			</div>

			<ul className="preloader-item-content grid gap-4 pl-8 pt-2">
				{
					Array.from({ length: 3 }).map((_, index) => (
						<li key={index} className='flex flex-row items-center px-2 py-1 gap-2 animate-pulse'>
							<Minus size={16} className='text-gray-500' />
							<div className='w-8 h-8 bg-violet-200 rounded-full flex items-center justify-center border-1 border-violet-400' />
							<span className='h-8 w-60 bg-gray-200 rounded-sm' />
						</li>
					))
				}
			</ul>
		</li>
	)
};