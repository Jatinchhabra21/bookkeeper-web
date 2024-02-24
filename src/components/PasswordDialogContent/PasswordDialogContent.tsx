import React, { ChangeEvent, ChangeEventHandler, useState } from 'react';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import {
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '../../../components/ui/dialog';
import { useAppDispatch } from '../../store/hooks';
import { toggleIsSignUpDialogVisible } from '../../store/slices/globalSlice';

type PasswordFieldStateType = {
	password: string;
	error: string | undefined;
	repeatPassword: string;
	repeatPasswordError: string | undefined;
};

export default function PasswordDialogContent() {
	const [passwordStage, setPasswordStage] = useState<PasswordFieldStateType>({
		password: '',
	} as PasswordFieldStateType);

	const dispatch = useAppDispatch();

	const handlePasswordStageChange = () => {
		if (!passwordStage.password) {
			setPasswordStage((prev) => {
				return { ...prev, error: 'Password is required' };
			});
		} else if (!passwordStage.repeatPassword) {
			setPasswordStage((prev) => {
				return {
					...prev,
					repeatPasswordError: 'Please confirm your password',
				};
			});
		} else if (passwordStage.password !== passwordStage.repeatPassword) {
			setPasswordStage((prev) => {
				return {
					...prev,
					repeatPasswordError: 'Password does not match',
				};
			});
		} else {
			setPasswordStage((prev) => {
				return { ...prev, error: undefined };
			});
			dispatch(toggleIsSignUpDialogVisible());
		}
	};

	const handlePasswordFieldError = () => {
		if (!passwordStage.password) {
			setPasswordStage((prev) => {
				return { ...prev, error: 'Password can not be empty' };
			});
			return;
		}

		const regex = new RegExp(
			/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/g
		);

		const digitRegex = new RegExp(/[0-9]/g);

		const uppercaseRegex = new RegExp(/[A-Z]/g);

		const specialCharRegex = new RegExp(/[!@#$%^&*]/g);

		if (passwordStage.password.length < 8) {
			setPasswordStage((prev) => {
				return { ...prev, error: 'Password length is less than 8 characters' };
			});
		} else if (passwordStage.password.length > 16) {
			setPasswordStage((prev) => {
				return { ...prev, error: 'Password length is more than 16 characters' };
			});
		} else if (!digitRegex.test(passwordStage.password)) {
			setPasswordStage((prev) => {
				return { ...prev, error: 'Password should contain at least one digit' };
			});
		} else if (!uppercaseRegex.test(passwordStage.password)) {
			setPasswordStage((prev) => {
				return {
					...prev,
					error: 'Password should contain at least one uppercase character',
				};
			});
		} else if (!specialCharRegex.test(passwordStage.password)) {
			setPasswordStage((prev) => {
				return {
					...prev,
					error: 'Password should contain at least one special character',
				};
			});
		} else if (!regex.test(passwordStage.password)) {
			setPasswordStage((prev) => {
				return { ...prev, error: 'Invalid password' };
			});
		} else {
			setPasswordStage((prev) => {
				return { ...prev, error: undefined };
			});
		}
	};

	const handleRepeatPasswordError = (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.value.length === 0) {
			setPasswordStage((prev) => {
				return {
					...prev,
					repeatPasswordError: 'Please re-enter your password',
				};
			});
		} else if (passwordStage.password !== event.target.value) {
			setPasswordStage((prev) => {
				return {
					...prev,
					repeatPasswordError: 'Password does not match',
				};
			});
		} else {
			setPasswordStage((prev) => {
				return { ...prev, repeatPasswordError: undefined };
			});
		}
	};

	return (
		<>
			<DialogHeader>
				<DialogTitle>Create password</DialogTitle>
			</DialogHeader>
			<div className="flex flex-col gap-4">
				<div className="flex flex-col gap-1">
					<Input
						type="password"
						placeholder="Password"
						value={passwordStage.password}
						onChange={(event: ChangeEvent<HTMLInputElement>) =>
							setPasswordStage((prev) => {
								return { ...prev, password: event.target.value };
							})
						}
						onBlur={handlePasswordFieldError}
						className={`${passwordStage.error ? 'border-[1] border-red-600' : ''} flex-1`}
						required
						aria-required
						autoFocus
					/>
					{passwordStage.error && (
						<p className="text-xs font-semibold text-red-600">
							{passwordStage.error}
						</p>
					)}
				</div>
				<div className="flex flex-col gap-1">
					<Input
						type="password"
						placeholder="Re-enter your password"
						value={passwordStage.repeatPassword}
						onChange={(event) => {
							setPasswordStage((prev) => {
								return {
									...prev,
									repeatPassword: event.target.value,
								};
							});
						}}
						onBlur={handleRepeatPasswordError}
						className={`${passwordStage.repeatPasswordError ? 'border-[1] border-red-600' : ''} flex-1`}
						required
						aria-required
					/>
					{passwordStage.repeatPasswordError && (
						<p className="text-xs font-semibold text-red-600">
							{passwordStage.repeatPasswordError}
						</p>
					)}
				</div>
			</div>
			<DialogFooter>
				<Button
					disabled={
						!!(passwordStage.repeatPasswordError || passwordStage.error)
					}
					onClick={handlePasswordStageChange}
				>
					Create account
				</Button>
			</DialogFooter>
		</>
	);
}
