import React, { ChangeEvent, SetStateAction, useState } from 'react';
import { Input } from '../../../components/ui/input';
import constants, {
	AuthenticationStage,
} from '../../constants/Authentication.constants';
import { Button } from '../../../components/ui/button';
import { useAppDispatch } from '../../store/hooks';
import { setEmail } from '../../store/slices/userSlice';
import { useRequestResetPasswordOtpMutation } from '../../store/slices/apiSlice';
import { ReloadIcon } from '@radix-ui/react-icons';
import { OtpRequest } from '../../store/apiSlice.types';
import { useToast } from '../../../components/ui/use-toast';

type EmailInputType = {
	email: string;
	error: string | undefined;
};

export type EmailInputContentPropType = {
	nextStage: AuthenticationStage;
	updateStage: (value: SetStateAction<AuthenticationStage>) => void;
};

export default function EmailInputContent({
	nextStage,
	updateStage,
}: EmailInputContentPropType) {
	const [emailInput, setEmailInput] = useState<EmailInputType>({
		email: '',
	} as EmailInputType);

	const dispatch = useAppDispatch();

	const [requestOtp, { isLoading }] = useRequestResetPasswordOtpMutation();

	const { toast } = useToast();

	const handleEmailFieldError = () => {
		if (!emailInput.email) {
			return;
		}
		const regex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
		if (!regex.test(emailInput.email))
			setEmailInput((prev: EmailInputType) => {
				return { ...prev, error: constants.EMAIL_INVALID };
			});
		else
			setEmailInput((prev: EmailInputType) => {
				return { ...prev, error: undefined };
			});
	};

	const handleStageChange = () => {
		if (!emailInput.email) {
			setEmailInput((prev: EmailInputType) => {
				return { ...prev, error: constants.EMAIL_REQUIRED };
			});
		} else if (!emailInput.error) {
			requestOtp({ email: emailInput.email } as OtpRequest)
				.unwrap()
				.then(() => {
					dispatch(setEmail(emailInput.email));
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
		<div className="w-full">
			<div className="mb-8 flex flex-col gap-2">
				<Input
					type="email"
					placeholder={constants.EMAIL_INPUT_PLACEHOLDER}
					value={emailInput.email}
					onChange={(event: ChangeEvent<HTMLInputElement>) =>
						setEmailInput((prev) => {
							return { ...prev, email: event.target.value };
						})
					}
					onBlur={handleEmailFieldError}
					className={`${emailInput.error ? 'outline outline-1 outline-offset-2 outline-red-600' : ''} flex-1`}
					required
					aria-required
				/>
				{emailInput.error && (
					<p className="text-xs font-semibold text-red-600">
						{emailInput.error}
					</p>
				)}
			</div>
			<Button
				disabled={isLoading || !!emailInput.error}
				className="w-full text-xs sm:text-sm"
				onClick={handleStageChange}
			>
				{isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
				{isLoading ? 'Please wait' : constants.USER_DETAIL_CTA_TEXT}
			</Button>
		</div>
	);
}
