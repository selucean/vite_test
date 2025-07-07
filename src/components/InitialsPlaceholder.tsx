export const InitialsPlaceholder = ({
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