import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { DialogHeader, DialogTitle } from '../../../components/ui/dialog';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import constants from '../../constants/OtpDialogContent.constants';
import { toggleIsSignUpDialogVisible } from '../../store/slices/globalSlice';

type OtpFieldStateType = {
	value: number | '';
	error: string | null;
};

export default function OtpDialogContent() {
	const dispatch = useAppDispatch();

	const [otpField, setOtpField] = useState<OtpFieldStateType>({
		value: '',
		error: null,
	} as OtpFieldStateType);

	const userEmail = useAppSelector((state) => state.auth.email);

	const validateOtp = () => {
		if (otpField.value?.toString().length !== constants.OTP_LENGTH)
			setOtpField((prev) => {
				return { ...prev, error: constants.OTP_INVALID };
			});
		else
			setOtpField((prev) => {
				return { ...prev, error: null };
			});
	};

	const handleOtpStageChange = () => {
		if (!otpField.value)
			setOtpField((prev) => {
				return { ...prev, error: constants.OTP_REQUIRED };
			});
		dispatch(toggleIsSignUpDialogVisible());
	};

	return (
		<>
			<DialogHeader>
				<DialogTitle>
					{constants.DIALOG_TITLE} {userEmail}
				</DialogTitle>
			</DialogHeader>
			<div className="flex flex-col gap-1">
				<div className="flex w-full items-center space-x-2">
					<Input
						type="number"
						placeholder={constants.OTP_INPUT_PLACEHOLDER}
						value={otpField.value}
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
						{constants.CTA_TEXT}
					</Button>
				</div>
				{otpField.error && (
					<p className="text-xs font-semibold text-red-600">{otpField.error}</p>
				)}
			</div>
		</>
	);
}
