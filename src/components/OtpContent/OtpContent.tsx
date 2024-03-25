import React, { useState } from 'react';
import { Button } from '../../../components/ui/button';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import constants from '../../constants/OtpDialogContent.constants';
import { AuthenticationStage } from '../../constants/Authentication.constants';
import { OTPInput, SlotProps } from 'input-otp';
import { cn } from '../../../lib/utils';
import { CreateUserRequest } from '../../store/apiSlice.types';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useAuth } from '../../hooks/useAuth';
import { setOtp } from '../../store/slices/unauthenticatedUserSlice';

type OtpFieldStateType = {
	value: string;
};

export type OtpDialogContentProps = {
	updateStage?: (value: React.SetStateAction<AuthenticationStage>) => void;
	nextStage?: AuthenticationStage;
};

export default function OtpDialogContent({
	updateStage,
	nextStage,
}: OtpDialogContentProps) {
	const { signUp, isLoading } = useAuth();

	const [otpField, setOtpField] = useState<OtpFieldStateType>(
		{} as OtpFieldStateType
	);

	const { email, name, password } = useAppSelector(
		(state) => state.unauthenticatedUser
	);

	const dispatch = useAppDispatch();

	const handleOtpStageChange = () => {
		if (!otpField.value)
			setOtpField((prev) => {
				return { ...prev, error: constants.OTP_REQUIRED };
			});
		else {
			if (nextStage) {
				dispatch(setOtp(otpField.value));
				updateStage && updateStage(nextStage);
			} else {
				signUp({
					displayName: name,
					email: email,
					password: password,
					otp: otpField.value,
					userPreference: {
						dailyReminder: false,
						defaultCurrency: 'INR',
						defaultTheme: 'Default',
					},
				} as unknown as CreateUserRequest);
			}
		}
	};

	function Slot(props: SlotProps) {
		return (
			<div
				className={cn(
					'relative h-14 w-10 text-[2rem]',
					'flex items-center justify-center',
					'transition-all duration-300',
					'border-y border-r border-border first:rounded-l-md first:border-l last:rounded-r-md',
					'group-focus-within:border-accent-foreground/20 group-hover:border-accent-foreground/20',
					'outline outline-0 outline-accent-foreground/20',
					{ 'outline-4 outline-accent-foreground': props.isActive }
				)}
			>
				{props.char !== null && <div>{props.char}</div>}
				{props.hasFakeCaret && <FakeCaret />}
			</div>
		);
	}

	function FakeCaret() {
		return (
			<div className="pointer-events-none absolute inset-0 flex animate-caret-blink items-center justify-center">
				<div className="h-8 w-px bg-white" />
			</div>
		);
	}

	return (
		<>
			<div className="my-2 mb-8 flex flex-col gap-1">
				<div className="flex w-full items-center justify-center space-x-2">
					<OTPInput
						maxLength={6}
						value={otpField.value?.toString()}
						onChange={(newValue) => setOtpField({ value: newValue })}
						render={({ slots }) => {
							return (
								<>
									<div className="flex w-full items-center justify-center">
										{slots.map((slot, idx) => {
											return <Slot key={idx} {...slot} />;
										})}
									</div>
								</>
							);
						}}
					/>
				</div>
			</div>
			<Button
				disabled={!otpField.value || isLoading}
				onClick={handleOtpStageChange}
				className={'w-full text-xs sm:text-sm'}
			>
				{isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
				{isLoading ? 'Please wait' : constants.CTA_TEXT}
			</Button>
		</>
	);
}
