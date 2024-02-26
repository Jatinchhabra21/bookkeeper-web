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
import { useRequestAccountActivationOtpMutation } from '../../store/slices/apiSlice';
import { OtpRequest } from '../../store/apiSlice.types';

type UserDetailStateType = {
	email: string;
	name: string;
	emailError: string | undefined;
	nameError: string | undefined;
	password: string;
	passwordError: string | undefined;
	repeatPassword: string;
	repeatPasswordError: string | undefined;
};

export type UserDetailDialogContentProps = {
	updateCurrentDialogStage: (email: React.SetStateAction<any>) => void;
	nextDialogStage: SignUpDialogStage;
};

export default function UserDetailDialogContent({
	updateCurrentDialogStage,
	nextDialogStage,
}: UserDetailDialogContentProps) {
	const userEmail = useAppSelector((state) => state.auth.email);

	const [requestOtp, { isLoading }] = useRequestAccountActivationOtpMutation();

	const dispatch = useAppDispatch();

	const [userDetail, setUserDetail] = useState<UserDetailStateType>({
		email: userEmail,
		password: '',
		repeatPassword: '',
		name: '',
	} as UserDetailStateType);

	const handlePasswordFieldError = () => {
		if (!userDetail.password) {
			setUserDetail((prev) => {
				return { ...prev, error: constants.PASSWORD_REQUIRED };
			});
			return;
		}

		const regex = new RegExp(
			/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/g
		);

		const digitRegex = new RegExp(/[0-9]/g);

		const uppercaseRegex = new RegExp(/[A-Z]/g);

		const specialCharRegex = new RegExp(/[!@#$%^&*]/g);

		if (userDetail.password.length < 8) {
			setUserDetail((prev) => {
				return { ...prev, passwordError: constants.PASSWORD_MIN_LENGTH };
			});
		} else if (userDetail.password.length > 16) {
			setUserDetail((prev) => {
				return { ...prev, passwordError: constants.PASSWORD_MAX_LENGTH };
			});
		} else if (!digitRegex.test(userDetail.password)) {
			setUserDetail((prev) => {
				return { ...prev, passwordError: constants.PASSWORD_DIGIT_RULE };
			});
		} else if (!uppercaseRegex.test(userDetail.password)) {
			setUserDetail((prev) => {
				return {
					...prev,
					passwordError: constants.PASSWORD_UPPERCASE_RULE,
				};
			});
		} else if (!specialCharRegex.test(userDetail.password)) {
			setUserDetail((prev) => {
				return {
					...prev,
					passwordError: constants.PASSWORD_SPECIAL_CHAR_RULE,
				};
			});
		} else if (!regex.test(userDetail.password)) {
			setUserDetail((prev) => {
				return { ...prev, passwordError: constants.PASSWORD_INVALID };
			});
		} else {
			setUserDetail((prev) => {
				return { ...prev, passwordError: undefined };
			});
		}
	};

	const handleRepeatPasswordError = () => {
		if (!userDetail.repeatPassword) {
			setUserDetail((prev) => {
				return {
					...prev,
					repeatPasswordError: constants.REPEAT_PASSWORD_REQUIRED,
				};
			});
		} else if (userDetail.password !== userDetail.repeatPassword) {
			setUserDetail((prev) => {
				return {
					...prev,
					repeatPasswordError: constants.PASSWORD_NO_MATCH,
				};
			});
		} else {
			setUserDetail((prev) => {
				return { ...prev, repeatPasswordError: undefined };
			});
		}
	};

	const handleEmailFieldError = () => {
		if (!userDetail.email) {
			return;
		}
		const regex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
		if (!regex.test(userDetail.email))
			setUserDetail((prev) => {
				return { ...prev, emailError: constants.EMAIL_INVALID };
			});
		else
			setUserDetail((prev) => {
				return { ...prev, emailError: undefined };
			});
	};

	const handleNameFieldError = () => {
		if (userDetail.name) {
			setUserDetail((prev) => {
				return {
					...prev,
					nameError: undefined,
				};
			});
		}
	};

	const handleEmailStageChange = () => {
		let isError = false;
		if (!userDetail.email) {
			setUserDetail((prev) => {
				return {
					...prev,
					emailError: constants.EMAIL_REQUIRED,
				};
			});

			isError = true;
		}
		if (!userDetail.name) {
			setUserDetail((prev) => {
				return { ...prev, nameError: constants.NAME_REQUIRED };
			});

			isError = true;
		}
		if (!userDetail.password) {
			setUserDetail((prev) => {
				return { ...prev, passwordError: constants.PASSWORD_REQUIRED };
			});

			isError = true;
		}
		if (!userDetail.repeatPassword) {
			setUserDetail((prev) => {
				return {
					...prev,
					repeatPasswordError: constants.REPEAT_PASSWORD_REQUIRED,
				};
			});

			isError = true;
		}

		if (!isError) {
			dispatch(setUserEmail(userDetail.email));
			dispatch(setUserName(userDetail.name));
			requestOtp({ email: userDetail.email } as OtpRequest)
				.unwrap()
				.then(() => {
					updateCurrentDialogStage(nextDialogStage);
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
						className={`${userDetail.nameError ? 'border-[1] border-red-600' : ''} flex-1`}
						onBlur={handleNameFieldError}
						onChange={(event) => {
							setUserDetail((prev) => {
								return { ...prev, name: event.target.value };
							});
						}}
						required
						aria-required
						autoFocus
					/>
					{userDetail.nameError && (
						<p className="text-xs font-semibold text-red-600">
							{userDetail.nameError}
						</p>
					)}
				</div>
				<div className="flex flex-col gap-1">
					<Input
						type="email"
						placeholder={constants.EMAIL_INPUT_PLACEHOLDER}
						value={userDetail.email}
						onChange={(event: ChangeEvent<HTMLInputElement>) =>
							setUserDetail((prev) => {
								return { ...prev, email: event.target.value };
							})
						}
						onBlur={handleEmailFieldError}
						className={`${userDetail.emailError ? 'border-[1] border-red-600' : ''} flex-1`}
						required
						aria-required
					/>
					{userDetail.emailError && (
						<p className="text-xs font-semibold text-red-600">
							{userDetail.emailError}
						</p>
					)}
				</div>
			</div>
			<div className="flex flex-col gap-4">
				<div className="flex flex-col gap-1">
					<Input
						type="password"
						placeholder={constants.PASSWORD_INPUT_PLACEHOLDER}
						value={userDetail.password}
						onChange={(event: ChangeEvent<HTMLInputElement>) =>
							setUserDetail((prev) => {
								return { ...prev, password: event.target.value };
							})
						}
						onBlur={handlePasswordFieldError}
						className={`${userDetail.passwordError ? 'border-[1] border-red-600' : ''} flex-1`}
						required
						aria-required
					/>
					{userDetail.passwordError && (
						<p className="text-xs font-semibold text-red-600">
							{userDetail.passwordError}
						</p>
					)}
				</div>
				<div className="flex flex-col gap-1">
					<Input
						type="password"
						placeholder={constants.REPEAT_PASSWORD_INPUT_PLACEHOLDER}
						value={userDetail.repeatPassword}
						onChange={(event) => {
							setUserDetail((prev) => {
								return {
									...prev,
									repeatPassword: event.target.value,
								};
							});
						}}
						onBlur={handleRepeatPasswordError}
						className={`${userDetail.repeatPasswordError ? 'border-[1] border-red-600' : ''} flex-1`}
						required
						aria-required
					/>
					{userDetail.repeatPasswordError && (
						<p className="text-xs font-semibold text-red-600">
							{userDetail.repeatPasswordError}
						</p>
					)}
				</div>
			</div>
			<DialogFooter>
				<Button
					disabled={!!(userDetail.emailError || userDetail.nameError)}
					onClick={handleEmailStageChange}
				>
					{constants.CTA_TEXT}
				</Button>
			</DialogFooter>
		</>
	);
}
