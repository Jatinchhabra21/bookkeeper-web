import React, { ChangeEvent, useState } from 'react';
import { LogInDialogStage } from '../../constants/LogInDialog.constants';
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

export type UserCredentialDialogContentPropType = {
	updateCurrentDialogStage: (value: React.SetStateAction<any>) => void;
	nextDialogStage: LogInDialogStage;
};

export type UserCredentialtateType = {
	email: string;
	password: string;
	emailError?: string;
};

export default function UserCredentialDialogContent() {
	const [userCredential, setUserCredential] = useState<UserCredentialtateType>(
		{} as UserCredentialtateType
	);

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

	return (
		<>
			<DialogHeader>
				<DialogTitle>{constants.DIALOG_TITLE}</DialogTitle>
			</DialogHeader>
			<div className="flex flex-col gap-4">
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
			</div>
			<DialogFooter>
				<Button
					disabled={!!userCredential.emailError}
					className={'text-xs sm:text-sm'}
				>
					{/* {isRequestOtpLoading && (
						<ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
					)}
					{isRequestOtpLoading ? 'Please wait' : constants.CTA_TEXT} */}
					{constants.CTA_TEXT}
				</Button>
			</DialogFooter>
		</>
	);
}
