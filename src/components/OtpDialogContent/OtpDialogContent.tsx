import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { SignUpDialogStage } from 'src/constants/SignUpDialog.constants';
import { DialogHeader, DialogTitle } from '../../../components/ui/dialog';
import { useAppSelector } from '../../store/hooks';

type OtpFieldStateType = {
	value: number | null;
	error: string | null;
};

export type OtpDialogContentProps = {
	updateCurrentDialogStage: (value: React.SetStateAction<any>) => void;
	nextDialogStage: SignUpDialogStage;
};

export default function OtpDialogContent({
	updateCurrentDialogStage,
	nextDialogStage,
}: OtpDialogContentProps) {
	const [otpField, setOtpField] = useState<OtpFieldStateType>({
		value: null,
		error: null,
	} as OtpFieldStateType);

	const userEmail = useAppSelector((state) => state.auth.email);

	useEffect(() => {
		console.log('OTP:', otpField.value);
	}, [otpField.value]);

	const validateOtp = () => {
		if (otpField.value?.toString().length !== 6)
			setOtpField((prev) => {
				return { ...prev, error: 'Invalid OTP' };
			});
		else
			setOtpField((prev) => {
				return { ...prev, error: null };
			});
	};

	const handleOtpStageChange = () => {
		if (!otpField.value)
			setOtpField((prev) => {
				return { ...prev, error: 'Please enter OTP sent to your e-mail.' };
			});
		updateCurrentDialogStage(nextDialogStage);
	};

	return (
		<>
			<DialogHeader>
				<DialogTitle>OTP was sent to {userEmail}</DialogTitle>
			</DialogHeader>
			<div className="flex flex-col gap-1">
				<div className="flex w-full items-center space-x-2">
					<Input
						type="number"
						placeholder="OTP"
						value={otpField.value ?? undefined}
						onChange={(event: ChangeEvent<HTMLInputElement>) =>
							setOtpField((prev) => {
								return { ...prev, value: parseInt(event.target.value) };
							})
						}
						onBlur={validateOtp}
						className={`${otpField.error ? 'border-[1] border-red-600' : ''} flex-1`}
						autoFocus
					/>
					<Button disabled={!!otpField.error} onClick={handleOtpStageChange}>
						Next
					</Button>
				</div>
				{otpField.error && (
					<p className="text-xs font-semibold text-red-600">{otpField.error}</p>
				)}
			</div>
		</>
	);
}
