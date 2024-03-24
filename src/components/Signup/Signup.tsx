import React, { useRef, useState } from 'react';
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	CardDescription,
} from '../../../components/ui/card';
import UserDetailContent from '../UserDetailContent/UserDetailContent';
import { SignUpStage } from '../../constants/SignUp.constants';
import OtpContent from '../OtpContent/OtpContent';
import { Link } from 'react-router-dom';

export default function Signup() {
	const [stage, setStage] = useState<SignUpStage>(SignUpStage.USER_DETAIL);

	function getCardContent() {
		switch (stage) {
			case SignUpStage.USER_DETAIL:
				return (
					<UserDetailContent
						nextStage={SignUpStage.OTP}
						updateStage={setStage}
					/>
				);
			case SignUpStage.OTP:
				return <OtpContent />;
		}
	}

	function getCardTitle(): string | undefined {
		switch (stage) {
			case SignUpStage.USER_DETAIL:
				return 'Sign up';
			case SignUpStage.OTP:
				return 'Verify your identity';
		}
	}

	function getCardDescription(): string | undefined {
		switch (stage) {
			case SignUpStage.USER_DETAIL:
				return "Let's create your account";
			case SignUpStage.OTP:
				return 'Enter OTP and Confirm';
		}
	}

	return (
		<div className="flex flex-col items-center gap-6">
			<Card className="w-[350px] shadow-lg shadow-slate-100/10">
				<CardHeader>
					<CardTitle>{getCardTitle()}</CardTitle>
					<CardDescription>{getCardDescription()}</CardDescription>
				</CardHeader>
				<CardContent>{getCardContent()}</CardContent>
			</Card>
			<div className="flex gap-1 text-sm">
				<span className="text-slate-400">Already have an account?</span>
				<Link
					to="/user/login"
					className="cursor-pointer border-b-2 border-transparent text-sm hover:border-slate-600"
				>
					Log in
				</Link>
			</div>
		</div>
	);
}
