import React, { ChangeEvent, ChangeEventHandler, useState } from 'react';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { SignUpDialogStage } from '../../constants/SignUpDialog.constants';
import constants from '../../constants/EmailDialogContent.constants';
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
		if (!emailStage.email && !emailStage.name) {
			setEmailStage((prev) => {
				return {
					...prev,
					emailError: constants.EMAIL_REQUIRED,
					nameError: constants.NAME_REQUIRED,
				};
			});
			return;
		} else if (!emailStage.email) {
			setEmailStage((prev) => {
				return {
					...prev,
					emailError: constants.EMAIL_REQUIRED,
				};
			});
			return;
		} else if (!emailStage.name) {
			setEmailStage((prev) => {
				return { ...prev, nameError: constants.NAME_REQUIRED };
			});
			return;
		}
		dispatch(setUserEmail(emailStage.email));
		dispatch(setUserName(emailStage.name));
		updateCurrentDialogStage(nextDialogStage);
	};

	const handleEmailFieldError = () => {
		if (!emailStage.email) {
			return;
		}
		const regex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
		if (!regex.test(emailStage.email))
			setEmailStage((prev) => {
				return { ...prev, emailError: constants.EMAIL_INVALID };
			});
		else
			setEmailStage((prev) => {
				return { ...prev, emailError: undefined };
			});
	};

	const handleNameFieldError = () => {
		if (emailStage.name) {
			setEmailStage((prev) => {
				return {
					...prev,
					nameError: undefined,
				};
			});
		}
	};

	return (
		<>
			<DialogHeader>
				<DialogTitle>{constants.DIALOG_TITLE}</DialogTitle>
			</DialogHeader>
			<div className="flex flex-col gap-4">
				<div className="flex flex-col gap-1">
					<Input
						type="text"
						placeholder={constants.NAME_INPUT_PLACEHOLDER}
						className={`${emailStage.nameError ? 'border-[1] border-red-600' : ''} flex-1`}
						onBlur={handleNameFieldError}
						onChange={(event) => {
							setEmailStage((prev) => {
								return { ...prev, name: event.target.value };
							});
						}}
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
						placeholder={constants.EMAIL_INPUT_PLACEHOLDER}
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
					{constants.CTA_TEXT}
				</Button>
			</DialogFooter>
		</>
	);
}
