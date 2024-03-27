import React, { ChangeEvent, SetStateAction, useState } from 'react';
import PasswordInput from '../PasswordInput/PasswordInput';
import constants, {
	AuthenticationStage,
} from '../../constants/Authentication.constants';
import { Button } from '../../../components/ui/button';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useResetPasswordMutation } from '../../store/slices/apiSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../../components/ui/use-toast';
import { setUserDetails } from '../../store/slices/userSlice';

type PasswordInputFieldType = {
	value: string;
	error: string | undefined;
};

type UpdatePasswordContentPropType = {
	nextStage?: AuthenticationStage;
	updateStage?: (value: SetStateAction<AuthenticationStage>) => void;
};

export default function UpdatePasswordContent({
	nextStage,
	updateStage,
}: UpdatePasswordContentPropType) {
	const [password, setPassword] = useState<PasswordInputFieldType>({
		value: '',
	} as PasswordInputFieldType);

	const [repeatPassword, setRepeatPassword] = useState<PasswordInputFieldType>({
		value: '',
	} as PasswordInputFieldType);

	const [resetPassword, { isLoading }] = useResetPasswordMutation();

	const { email, otp } = useAppSelector((state) => state.user);

	const navigate = useNavigate();
	const { toast } = useToast();
	const dispatch = useAppDispatch();

	const handlePasswordFieldError = () => {
		if (!password.value) {
			setPassword((prev) => {
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

		if (password.value.length < 8) {
			setPassword((prev) => {
				return { ...prev, error: constants.PASSWORD_MIN_LENGTH };
			});
		} else if (password.value.length > 16) {
			setPassword((prev) => {
				return { ...prev, error: constants.PASSWORD_MAX_LENGTH };
			});
		} else if (!digitRegex.test(password.value)) {
			setPassword((prev) => {
				return { ...prev, error: constants.PASSWORD_DIGIT_RULE };
			});
		} else if (!uppercaseRegex.test(password.value)) {
			setPassword((prev) => {
				return {
					...prev,
					error: constants.PASSWORD_UPPERCASE_RULE,
				};
			});
		} else if (!specialCharRegex.test(password.value)) {
			setPassword((prev) => {
				return {
					...prev,
					error: constants.PASSWORD_SPECIAL_CHAR_RULE,
				};
			});
		} else if (!regex.test(password.value)) {
			setPassword((prev) => {
				return { ...prev, error: constants.PASSWORD_INVALID };
			});
		} else {
			setPassword((prev) => {
				return { ...prev, error: undefined };
			});
		}
	};

	const handleRepeatPasswordError = () => {
		if (password.value !== repeatPassword.value) {
			setRepeatPassword((prev) => {
				return {
					...prev,
					error: constants.PASSWORD_NO_MATCH,
				};
			});
		} else if (!repeatPassword.value) {
			setRepeatPassword((prev) => {
				return {
					...prev,
					error: constants.REPEAT_PASSWORD_REQUIRED,
				};
			});
		} else {
			setRepeatPassword((prev) => {
				return { ...prev, error: undefined };
			});
		}
	};

	const handleResetPassword = () => {
		debugger;
		if (password.value && repeatPassword.value)
			resetPassword({
				email: email!,
				newPassword: password.value,
				otp: Number(otp),
			})
				.unwrap()
				.then(() => {
					if (!nextStage) navigate('/user/login');
					else {
						updateStage && updateStage(nextStage);
					}
				})
				.catch((error) => {
					toast({
						title: error.errorMessage
							? '🙁 Oops! ' + error.errorMessage
							: '🙁 Oops! Something went wrong.',
						variant: 'error',
					});
				})
				.finally(() => dispatch(setUserDetails()));
	};

	return (
		<>
			<div className="mb-8 flex flex-col gap-4">
				<div className="flex flex-col gap-2">
					<PasswordInput
						placeholder={constants.PASSWORD_INPUT_PLACEHOLDER}
						value={password.value}
						onChange={(event: ChangeEvent<HTMLInputElement>) =>
							setPassword((prev) => {
								return { ...prev, value: event.target.value };
							})
						}
						onBlur={handlePasswordFieldError}
						error={password.error}
						required
						aria-required
					/>
					{password.error && (
						<p className="text-xs font-semibold text-red-600">
							{password.error}
						</p>
					)}
				</div>
				<div className="flex flex-col gap-2">
					<PasswordInput
						placeholder={constants.REPEAT_PASSWORD_INPUT_PLACEHOLDER}
						value={repeatPassword.value}
						onChange={(event) => {
							setRepeatPassword((prev) => {
								return {
									...prev,
									value: event.target.value,
								};
							});
						}}
						onBlur={handleRepeatPasswordError}
						error={repeatPassword.error}
						required
						aria-required
					/>
					{repeatPassword.error && (
						<p className="text-xs font-semibold text-red-600">
							{repeatPassword.error}
						</p>
					)}
				</div>
			</div>

			<Button
				disabled={!!(password.error || repeatPassword.error) || isLoading}
				onClick={handleResetPassword}
				className={'w-full text-xs sm:text-sm'}
			>
				{isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
				{isLoading ? 'Please wait' : constants.USER_DETAIL_CTA_TEXT}
			</Button>
		</>
	);
}
