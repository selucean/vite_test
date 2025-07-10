import { useEffect } from 'react';
import { EInputKind, ERequestStatus } from '@/lib/types';
import { useAppDispatch, useAppSelector } from '@/lib/store';
import authSlice, { EAuthAction } from '@/slices/authSlice';
import { UiInput } from '@/components/UiInput';
import { useNavigate } from 'react-router';
import usersSlice, { EUsersAction } from '@/slices/usersSlice';
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod';
import { LoaderCircle } from 'lucide-react';

const loginSchema = z.object({
	email: z.email().min(1, "Email is required"),
	password: z.string().min(1, "Password is required"),
});

type TFormInput = z.infer<typeof loginSchema>;

export default function LoginPage() {
	const dispatch = useAppDispatch();
	const isAuthenticated = useAppSelector(authSlice.selectors.getIsAuthenticated);
	const authStatus = useAppSelector(authSlice.selectors.getStatus);
	const navigate = useNavigate();

	const {
		handleSubmit,
		formState: { errors, touchedFields  },
		control,
		setError,
		clearErrors
	} = useForm({
		mode: 'onSubmit',
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: ''
		}
	});

	const onHandleSubmit: SubmitHandler<TFormInput> = (data) => {
		clearErrors("root");
		const { email, password } = data;
		dispatch(authSlice.actions[EAuthAction.LOGIN]({ email, password }))
	}

	useEffect(() => {
		if (isAuthenticated && authStatus === ERequestStatus.FULFILLED) {
			dispatch(usersSlice.actions[EUsersAction.GET_USERS]());

			navigate("/team");
		}
	}, [isAuthenticated, authStatus]);

	useEffect(() => {
		if (authStatus === ERequestStatus.REJECTED && (touchedFields.email || touchedFields.password)) {
			setError("root", {
				message: "Invalid email or password"
			});
		}
	}, [authStatus, touchedFields]);

	return (
		<div className='grid grid-cols-6 mx-auto min-w-md lg:w-3xl bg-violet-100 border border-violet-200 rounded-xl py-10 shadow'>
			<h2 className='col-span-6 text-center text-violet-900 font-bold mb-4'>
				Please login
			</h2>
			<form
				onSubmit={handleSubmit(onHandleSubmit)}
				className='flex flex-col col-span-4 col-start-2 w-full gap-y-2 py-3 px-2'
			>
				<Controller
					name='email'
					control={control}
					render={({ field }) => (
						<>
							<UiInput
								{...field}
								kind={(errors.email || errors.root) ? EInputKind.ERROR : EInputKind.DEFAULT}
								id="email"
								type="email"
								placeholder="Email"
								required={true}
							/>
							{errors.email ? (
								<small className="text-red-500">{errors.email.message}</small>
							) : null}
						</>
					)}
				/>
				<Controller
					name='password'
					control={control}
					render={({ field }) => (
						<>
							<UiInput
								{...field}
								kind={(errors.password || errors.root) ? EInputKind.ERROR : EInputKind.DEFAULT}
								id="password"
								type="password"
								placeholder="Password"
								autoComplete='off'
								required={true}
							/>
							{
								errors.password ? (
									<small className="text-red-500">{errors.password.message}</small>
								) : null
							}
						</>
					)}
				/>

				{
					errors.root ? (
						<small className="text-red-500">{errors.root.message}</small>
					) : null
				}

				<button
					type='submit'
					className='bg-violet-900 text-white rounded-sm p-2 hover:bg-red-500 transition-colors duration-200 mt-4 mx-auto w-1/2 lg:w-1/3 flex justify-center'>
					{
						authStatus === ERequestStatus.PENDING
							? <LoaderCircle size={20} className='animate-spin text-violet-500' />
							: <span>Login</span>
					}
				</button>
			</form>
		</div>
	)
};

