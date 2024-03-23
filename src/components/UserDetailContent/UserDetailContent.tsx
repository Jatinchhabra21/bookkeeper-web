import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { SignUpStage } from '../../constants/SignUp.constants';
import constants from '../../constants/SignUp.constants';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
	SignUpDetailsType,
	setSignUpDetails,
} from '../../store/slices/authSlice';
import {
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '../../../components/ui/dialog';
import { useRequestAccountActivationOtpMutation } from '../../store/slices/apiSlice';
import { OtpRequest } from '../../store/apiSlice.types';
import { ReloadIcon } from '@radix-ui/react-icons';
import PasswordInput from '../PasswordInput/PasswordInput';
import { useToast } from '../../../components/ui/use-toast';

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
	updateStage: (value: React.SetStateAction<any>) => void;
	nextStage: SignUpStage;
};

export default function UserDetailDialogContent({
	updateStage,
	nextStage,
}: UserDetailDialogContentProps) {
	// redux state
	const userEmail = useAppSelector((state) => state.auth.signUpDetails.email);
	const { toast } = useToast(); // shadcn ui hook

	const [
		requestOtp,
		{ isLoading: isRequestOtpLoading, isError: isRequestOtpError },
	] = useRequestAccountActivationOtpMutation(); // rtk mutation hook

	const dispatch = useAppDispatch(); // dispatch hook

	// state
	const [userDetail, setUserDetail] = useState<UserDetailStateType>({
		email: userEmail,
		password: '',
		repeatPassword: '',
		name: '',
	} as UserDetailStateType);

	const handlePasswordFieldError = () => {
		if (!userDetail.password) {
			setUserDetail((prev) => {
				return { ...prev, passwordError: constants.PASSWORD_REQUIRED };
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
		if (userDetail.password !== userDetail.repeatPassword) {
			setUserDetail((prev) => {
				return {
					...prev,
					repeatPasswordError: constants.PASSWORD_NO_MATCH,
				};
			});
		} else if (!userDetail.repeatPassword) {
			setUserDetail((prev) => {
				return {
					...prev,
					repeatPasswordError: constants.REPEAT_PASSWORD_REQUIRED,
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
			setUserDetail((prev) => {
				return { ...prev, emailError: constants.EMAIL_REQUIRED };
			});
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
		} else {
			setUserDetail((prev) => {
				return {
					...prev,
					nameError: constants.NAME_REQUIRED,
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
			dispatch(
				setSignUpDetails({
					name: userDetail.name,
					email: userDetail.email,
					password: userDetail.password,
				} as SignUpDetailsType)
			);
			requestOtp({ email: userDetail.email } as OtpRequest)
				.unwrap()
				.then(() => {
					updateStage(nextStage);
				})
				.catch((error) => {
					toast({
						title: 'Uh oh! Something went wrong.',
						description: error.data.ErrorMessage,
					});
				});
		}
	};

	return (
		<>
			<div className="mb-8 flex flex-col gap-4">
				<div className="flex flex-col gap-2">
					<Input
						type="text"
						placeholder={constants.NAME_INPUT_PLACEHOLDER}
						className={`${userDetail.nameError ? 'outline outline-1 outline-offset-2 outline-red-600' : ''} flex-1`}
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
				<div className="flex flex-col gap-2">
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
						className={`${userDetail.emailError ? 'outline outline-1 outline-offset-2 outline-red-600' : ''} flex-1`}
						required
						aria-required
					/>
					{userDetail.emailError && (
						<p className="text-xs font-semibold text-red-600">
							{userDetail.emailError}
						</p>
					)}
				</div>
				<div className="flex flex-col gap-2">
					<PasswordInput
						placeholder={constants.PASSWORD_INPUT_PLACEHOLDER}
						value={userDetail.password}
						onChange={(event: ChangeEvent<HTMLInputElement>) =>
							setUserDetail((prev) => {
								return { ...prev, password: event.target.value };
							})
						}
						onBlur={handlePasswordFieldError}
						error={userDetail.passwordError}
						required
						aria-required
					/>
					{userDetail.passwordError && (
						<p className="text-xs font-semibold text-red-600">
							{userDetail.passwordError}
						</p>
					)}
				</div>
				<div className="flex flex-col gap-2">
					<PasswordInput
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
						error={userDetail.repeatPasswordError}
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
			<Button
				disabled={
					!!(
						userDetail.emailError ||
						userDetail.nameError ||
						userDetail.passwordError ||
						userDetail.repeatPasswordError
					) || isRequestOtpLoading
				}
				onClick={handleEmailStageChange}
				className={'w-full text-xs sm:text-sm'}
			>
				{isRequestOtpLoading && (
					<ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
				)}
				{isRequestOtpLoading ? 'Please wait' : constants.CTA_TEXT}
			</Button>
		</>
	);
}
