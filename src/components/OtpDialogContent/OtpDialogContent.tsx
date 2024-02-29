import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import {
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '../../../components/ui/dialog';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import constants from '../../constants/OtpDialogContent.constants';
import { toggleIsSignUpDialogVisible } from '../../store/slices/globalSlice';
import { DialogStage } from '../../constants/SignUpDialog.constants';
import { OTPInput, SlotProps } from 'input-otp';
import { cn } from '../../../lib/utils';

type OtpFieldStateType = {
	value: string;
};

export type OtpDialogContentProps = {
	updateCurrentDialogStage?: (email: React.SetStateAction<any>) => void;
	nextDialogStage?: DialogStage;
};

export default function OtpDialogContent({
	updateCurrentDialogStage,
	nextDialogStage,
}: OtpDialogContentProps) {
	const dispatch = useAppDispatch();

	const [otpField, setOtpField] = useState<OtpFieldStateType>(
		{} as OtpFieldStateType
	);

	useEffect(() => {
		console.log(otpField.value);
	}, [otpField.value]);

	const userEmail = useAppSelector((state) => state.auth.email);

	const handleOtpStageChange = () => {
		if (!otpField.value)
			setOtpField((prev) => {
				return { ...prev, error: constants.OTP_REQUIRED };
			});
		dispatch(toggleIsSignUpDialogVisible());
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
			<div className="animate-caret-blink pointer-events-none absolute inset-0 flex items-center justify-center">
				<div className="h-8 w-px bg-white" />
			</div>
		);
	}

	return (
		<>
			<DialogHeader>
				<DialogTitle>
					{constants.DIALOG_TITLE} {userEmail}
				</DialogTitle>
			</DialogHeader>
			<div className="my-2 flex flex-col gap-1">
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
			<DialogFooter>
				<Button disabled={!otpField.value} onClick={handleOtpStageChange}>
					{constants.CTA_TEXT}
				</Button>
			</DialogFooter>
		</>
	);
}
