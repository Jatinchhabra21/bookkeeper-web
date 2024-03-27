import React, { ReactNode, useState } from 'react';
import { AuthenticationStage } from '../../constants/Authentication.constants';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '../../../components/ui/card';
import EmailInputContent from '../EmailInputContent/EmailInputContent';
import OtpContent from '../OtpContent/OtpContent';
import UpdatePasswordContent from '../UpdatePasswordContent/UpdatePasswordContent';
import { useAppSelector } from '../../store/hooks';

export default function ResetPassword() {
	const [stage, setStage] = useState<AuthenticationStage>(
		AuthenticationStage.EMAIL_INPUT
	);

	const email = useAppSelector((state) => state.user.email);

	function getCardContent(): ReactNode {
		switch (stage) {
			case AuthenticationStage.EMAIL_INPUT:
				return (
					<EmailInputContent
						nextStage={AuthenticationStage.OTP}
						updateStage={setStage}
					/>
				);
			case AuthenticationStage.OTP:
				return (
					<OtpContent
						nextStage={AuthenticationStage.UPDATE_PASSWORD}
						updateStage={setStage}
					/>
				);
			case AuthenticationStage.UPDATE_PASSWORD:
				return <UpdatePasswordContent />;
		}
	}

	function getCardTitle(): string | undefined {
		switch (stage) {
			case AuthenticationStage.EMAIL_INPUT:
				return 'Reset password';
			case AuthenticationStage.OTP:
				return `Enter OTP sent to ${email}`;
			case AuthenticationStage.UPDATE_PASSWORD:
				return 'Reset your password';
		}
	}

	function getCardDescription(): string | undefined {
		switch (stage) {
			case AuthenticationStage.EMAIL_INPUT:
				return 'It happens to the best of us';
		}
	}

	return (
		<div className="flex flex-col items-center gap-6">
			<Card className="w-[350px] shadow-lg  shadow-slate-100/10 sm:w-[500px]">
				<CardHeader>
					<CardTitle>{getCardTitle()}</CardTitle>
					<CardDescription>{getCardDescription()}</CardDescription>
				</CardHeader>
				<CardContent>{getCardContent()}</CardContent>
			</Card>
		</div>
	);
}
