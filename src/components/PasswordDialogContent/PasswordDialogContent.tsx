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
import constants from '../../constants/PasswordDialogContent.constants';

type PasswordFieldStateType = {
	password: string;
	error: string | undefined;
	repeatPassword: string;
	repeatPasswordError: string | undefined;
};

export default function PasswordDialogContent() {
	const [passwordStage, setPasswordStage] = useState<PasswordFieldStateType>({
		password: '',
		repeatPassword: '',
	} as PasswordFieldStateType);

	const dispatch = useAppDispatch();

	const handlePasswordStageChange = () => {
		if (!passwordStage.password) {
			setPasswordStage((prev) => {
				return { ...prev, error: constants.PASSWORD_REQUIRED };
			});
		} else if (!passwordStage.repeatPassword) {
			setPasswordStage((prev) => {
				return {
					...prev,
					repeatPasswordError: constants.REPEAT_PASSWORD_REQUIRED,
				};
			});
		} else if (passwordStage.password !== passwordStage.repeatPassword) {
			setPasswordStage((prev) => {
				return {
					...prev,
					repeatPasswordError: constants.PASSWORD_NO_MATCH,
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

		if (passwordStage.password.length < 8) {
			setPasswordStage((prev) => {
				return { ...prev, error: constants.PASSWORD_MIN_LENGTH };
			});
		} else if (passwordStage.password.length > 16) {
			setPasswordStage((prev) => {
				return { ...prev, error: constants.PASSWORD_MAX_LENGTH };
			});
		} else if (!digitRegex.test(passwordStage.password)) {
			setPasswordStage((prev) => {
				return { ...prev, error: constants.PASSWORD_DIGIT_RULE };
			});
		} else if (!uppercaseRegex.test(passwordStage.password)) {
			setPasswordStage((prev) => {
				return {
					...prev,
					error: constants.PASSWORD_UPPERCASE_RULE,
				};
			});
		} else if (!specialCharRegex.test(passwordStage.password)) {
			setPasswordStage((prev) => {
				return {
					...prev,
					error: constants.PASSWORD_SPECIAL_CHAR_RULE,
				};
			});
		} else if (!regex.test(passwordStage.password)) {
			setPasswordStage((prev) => {
				return { ...prev, error: constants.PASSWORD_INVALID };
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
					repeatPasswordError: constants.REPEAT_PASSWORD_REQUIRED,
				};
			});
		} else if (passwordStage.password !== event.target.value) {
			setPasswordStage((prev) => {
				return {
					...prev,
					repeatPasswordError: constants.PASSWORD_NO_MATCH,
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
						placeholder={constants.PASSWORD_INPUT_PLACEHOLDER}
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
						placeholder={constants.REPEAT_PASSWORD_INPUT_PLACEHOLDER}
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
					{constants.CTA_TEXT}
				</Button>
			</DialogFooter>
		</>
	);
}
