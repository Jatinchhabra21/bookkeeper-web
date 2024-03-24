import React, { ChangeEvent, useState } from 'react';
import { Input } from '../../../components/ui/input';
import constants from '../../constants/UserCredentialDialogContent.constants';
import PasswordInput from '../PasswordInput/PasswordInput';
import {
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '../../../components/ui/dialog';
import { Button } from '../../../components/ui/button';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useAuth } from '../../hooks/useAuth';

export type UserCredentialtateType = {
	email: string;
	password: string;
	emailError?: string;
	passwordError?: string;
};

export default function UserCredentialContent() {
	const [userCredential, setUserCredential] = useState<UserCredentialtateType>(
		{} as UserCredentialtateType
	);

	const { logIn, isLoading } = useAuth();

	const handleEmailFieldError = () => {
		if (!userCredential.email) {
			return;
		}
		const regex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
		if (!regex.test(userCredential.email))
			setUserCredential((prev) => {
				return { ...prev, emailError: constants.EMAIL_INVALID };
			});
		else
			setUserCredential((prev) => {
				return { ...prev, emailError: undefined };
			});
	};

	function handleLogin() {
		if (!userCredential.email) {
			setUserCredential((prev) => {
				return {
					...prev,
					emailError: constants.EMAIL_REQUIRED,
				};
			});
			return;
		}
		if (!userCredential.password) {
			setUserCredential((prev) => {
				return {
					...prev,
					passwordError: constants.PASSWORD_REQUIRED,
				};
			});
			return;
		}
		logIn({
			email: userCredential.email,
			password: userCredential.password,
		});
	}

	return (
		<>
			<div className="mb-8 flex flex-col gap-4">
				<div className="flex flex-col gap-1">
					<Input
						type="email"
						placeholder={constants.EMAIL_INPUT_PLACEHOLDER}
						value={userCredential.email}
						onChange={(event: ChangeEvent<HTMLInputElement>) =>
							setUserCredential((prev) => {
								return { ...prev, email: event.target.value };
							})
						}
						onBlur={handleEmailFieldError}
						className={`${userCredential.emailError ? 'outline outline-1 outline-offset-2 outline-red-600' : ''} flex-1`}
						required
						aria-required
					/>
					{userCredential.emailError && (
						<p className="text-xs font-semibold text-red-600">
							{userCredential.emailError}
						</p>
					)}
				</div>
				<PasswordInput
					placeholder={constants.PASSWORD_INPUT_PLACEHOLDER}
					value={userCredential.password}
					onChange={(event: ChangeEvent<HTMLInputElement>) =>
						setUserCredential((prev) => {
							return { ...prev, password: event.target.value };
						})
					}
					required
					aria-required
				/>
				<div className="flex justify-end">
					<span className="cursor-pointer border-b-2 border-transparent text-sm text-slate-400 hover:border-slate-600">
						Forgot password?
					</span>
				</div>
			</div>
			<Button
				disabled={!!userCredential.emailError || isLoading}
				className={'w-full text-xs sm:text-sm'}
				onClick={handleLogin}
			>
				{isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
				{isLoading ? 'Please wait' : constants.CTA_TEXT}
			</Button>
		</>
	);
}
