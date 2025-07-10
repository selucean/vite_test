export const InitialsPlaceholder = ({
	initials
}: {
	initials: string
}) => (
	<div className='w-8 h-8 bg-violet-200 rounded-full flex items-center justify-center border-1 border-violet-400'>
		<span className='text-violet-400 text-xs'>
			{initials}
		</span>
	</div>
)