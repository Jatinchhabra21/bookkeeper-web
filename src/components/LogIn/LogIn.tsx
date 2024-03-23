import React, { ReactNode, useState } from 'react';
import { LogInStage } from '../../constants/LogIn.constants';
import UserCredentialContent from '../UserCredentialContent/UserCredentialContent';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '../../../components/ui/card';
import { Link } from 'react-router-dom';

export default function LogInDialog() {
	const [stage, setStage] = useState<LogInStage>(LogInStage.USER_CREDENTIAL);

	function getCardContent(): ReactNode {
		switch (stage) {
			case LogInStage.USER_CREDENTIAL:
				return <UserCredentialContent />;
			case LogInStage.RESET_PASSWORD:
				return <></>;
		}
	}

	function getCardTitle(): string | undefined {
		switch (stage) {
			case LogInStage.USER_CREDENTIAL:
				return 'Log into my account';
			case LogInStage.RESET_PASSWORD:
				return 'Reset password';
		}
	}

	function getCardDescription(): string | undefined {
		switch (stage) {
			case LogInStage.USER_CREDENTIAL:
				return '';
			case LogInStage.RESET_PASSWORD:
				return 'It happens to the best of us';
		}
	}

	return (
		<div className="flex flex-col items-center gap-4">
			<Card className="w-[350px] shadow-lg shadow-slate-100/10">
				<CardHeader>
					<CardTitle>{getCardTitle()}</CardTitle>
					<CardDescription>{getCardDescription()}</CardDescription>
				</CardHeader>
				<CardContent>{getCardContent()}</CardContent>
			</Card>
			<div>
				<Link
					to="/user/signup"
					className="cursor-pointer border-b-2 border-transparent text-sm hover:border-slate-600"
				>
					Don't have an account?
				</Link>
			</div>
		</div>
	);
}
