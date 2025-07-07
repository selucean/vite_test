import React from "react";
import { twMerge } from 'tailwind-merge';
import { EInputKind } from '@/lib/types';

export type TUiInputProps = {
	id: string,
	className?: string,
	kind?: EInputKind,
} & React.InputHTMLAttributes<HTMLInputElement>;

const inputStateClasses = {
	[EInputKind.DEFAULT]: "border-gray-300",
	[EInputKind.ERROR]: "border-red-500",
	[EInputKind.SUCCESS]: "border-green-500",
} as const;

export const UiInput = ({
	id,
	className,
	kind = EInputKind.DEFAULT,
	...props
}: TUiInputProps) => {
	return (
		<label 
		htmlFor={ id }
		className={
			twMerge(
				'flex flex-row gap-2 items-center border rounded-sm p-2 text-sm text-gray-700',
				kind ? inputStateClasses[kind] : '',
				props.disabled ? 'opacity-50 cursor-not-allowed' : 'bg-white',
				className
			)
		}
		>
			<input 
				id = { id }
				className='w-full flex-1 border-0 bg-transparent outline-hidden placeholder:text-gray-300'
				{ ...props }
			/>
		</label>
	);
}
