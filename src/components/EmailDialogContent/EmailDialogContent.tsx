import React, { ChangeEvent, ChangeEventHandler, useState } from 'react';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { SignUpDialogStage } from 'src/constants/SignUpDialog.constants';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setUserEmail, setUserName } from '../../store/slices/authSlice';
import {
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '../../../components/ui/dialog';

type EmailFieldStateType = {
	email: string;
	name: string;
	emailError: string | undefined;  
	nameError: string | undefined;
};

export type EmailDialogContentProps = {
	updateCurrentDialogStage: (email: React.SetStateAction<any>) => void;
	nextDialogStage: SignUpDialogStage;
};

export default function EmailDialogContent({
	updateCurrentDialogStage,
	nextDialogStage,
}: EmailDialogContentProps) {
	const userEmail = useAppSelector((state) => state.auth.email);

	const dispatch = useAppDispatch();

	const [emailStage, setEmailStage] = useState<EmailFieldStateType>({
		email: userEmail,
	} as EmailFieldStateType);

	const handleEmailStageChange = () => {
		if (!emailStage.email) {
			setEmailStage((prev) => {
				return { ...prev, emailError: 'Email address is required' };
			});
			return;
		}
		dispatch(setUserEmail(emailStage.email));
		dispatch(setUserName(emailStage.name));
		updateCurrentDialogStage(nextDialogStage);
	};

	const handleEmailFieldError = () => {
		if (!emailStage.email) {
			setEmailStage((prev) => {
				return { ...prev, emailError: undefined };
			});
			return;
		}
		const regex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
		if (!regex.test(emailStage.email))
			setEmailStage((prev) => {
				return { ...prev, emailError: 'Invalid email' };
			});
		else
			setEmailStage((prev) => {
				return { ...prev, emailError: undefined };
			});
	};

	const handleNameError = (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.value.length === 0) {
			setEmailStage((prev) => {
				return { ...prev, nameError: 'Please enter your name' };
			});
		} else {
			setEmailStage((prev) => {
				return { ...prev, nameError: undefined };
			});
		}
	};

	return (
		<>
			<DialogHeader>
				<DialogTitle>Enter your email</DialogTitle>
			</DialogHeader>
			<div className="flex flex-col gap-4">
				<div className="flex flex-col gap-1">
					<Input
						type="text"
						placeholder="Full name"
						onBlur={handleNameError}
						className={`${emailStage.nameError ? 'border-[1] border-red-600' : ''} flex-1`}
						required
						aria-required
						autoFocus
					/>
					{emailStage.nameError && (
						<p className="text-xs font-semibold text-red-600">
							{emailStage.nameError}
						</p>
					)}
				</div>
				<div className="flex flex-col gap-1">
					<Input
						type="email"
						placeholder="Email"
						value={emailStage.email}
						onChange={(event: ChangeEvent<HTMLInputElement>) =>
							setEmailStage((prev) => {
								return { ...prev, email: event.target.value };
							})
						}
						onBlur={handleEmailFieldError}
						className={`${emailStage.emailError ? 'border-[1] border-red-600' : ''} flex-1`}
						required
						aria-required
					/>
					{emailStage.emailError && (
						<p className="text-xs font-semibold text-red-600">
							{emailStage.emailError}
						</p>
					)}
				</div>
			</div>
			<DialogFooter>
				<Button
					disabled={!!(emailStage.emailError || emailStage.nameError)}
					onClick={handleEmailStageChange}
				>
					Get Otp
				</Button>
			</DialogFooter>
		</>
	);
}
