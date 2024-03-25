import { ChangeEvent, useState } from 'react';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '../../../components/ui/card';
import { Link } from 'react-router-dom';
import { Button } from '../../../components/ui/button';
import constants from '../../constants/UserCredentialDialogContent.constants';
import { Input } from '../../../components/ui/input';
import { useAuth } from '../../hooks/useAuth';
import PasswordInput from '../PasswordInput/PasswordInput';
import { ReloadIcon } from '@radix-ui/react-icons';

type UserCredentialType = {
	email: string;
	password: string;
	emailError?: string;
	passwordError?: string;
};

export default function LogInDialog() {
	// function getCardTitle(): string | undefined {
	// 	switch (stage) {
	// 		case AuthenticationStage.USER_CREDENTIAL:
	// 			return;
	// 		case AuthenticationStage.RESET_PASSWORD:
	// 			return 'Reset password';
	// 	}
	// }

	// function getCardDescription(): string | undefined {
	// 	switch (stage) {
	// 		case AuthenticationStage.USER_CREDENTIAL:
	// 			return '';
	// 		case AuthenticationStage.RESET_PASSWORD:
	// 			return 'It happens to the best of us';
	// 	}
	// }

	const [userCredential, setUserCredential] = useState<UserCredentialType>(
		{} as UserCredentialType
	);

	const { logIn, isLoading } = useAuth();

	const handleEmailFieldError = () => {
		if (!userCredential.email) {
			return;
		}
		const regex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
		if (!regex.test(userCredential.email))
			setUserCredential((prev: UserCredentialType) => {
				return { ...prev, emailError: constants.EMAIL_INVALID };
			});
		else
			setUserCredential((prev: UserCredentialType) => {
				return { ...prev, emailError: undefined };
			});
	};

	function handleLogin() {
		if (!userCredential.email) {
			setUserCredential((prev: UserCredentialType) => {
				return {
					...prev,
					emailError: constants.EMAIL_REQUIRED,
				};
			});
			return;
		}
		if (!userCredential.password) {
			setUserCredential((prev: UserCredentialType) => {
				return {
					...prev,
					passwordError: constants.PASSWORD_REQUIRED,
				};
			});
			return;
		}
		logIn({
			email: userCredential.email,
			password: userCredential.password,
		});
	}

	return (
		<div className="flex flex-col items-center gap-4">
			<Card className="w-[350px] shadow-lg shadow-slate-100/10 sm:w-[500px]">
				<CardHeader>
					<CardTitle>{'Log into my account'}</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="mb-8 flex flex-col gap-4">
						<div className="flex flex-col gap-2">
							<Input
								type="email"
								placeholder={constants.EMAIL_INPUT_PLACEHOLDER}
								value={userCredential.email}
								onChange={(event: ChangeEvent<HTMLInputElement>) =>
									setUserCredential((prev) => {
										return { ...prev, email: event.target.value };
									})
								}
								onBlur={handleEmailFieldError}
								className={`${userCredential.emailError ? 'outline outline-1 outline-offset-2 outline-red-600' : ''} flex-1`}
								required
								aria-required
							/>
							{userCredential.emailError && (
								<p className="text-xs font-semibold text-red-600">
									{userCredential.emailError}
								</p>
							)}
						</div>
						<PasswordInput
							placeholder={constants.PASSWORD_INPUT_PLACEHOLDER}
							value={userCredential.password}
							onChange={(event: ChangeEvent<HTMLInputElement>) =>
								setUserCredential((prev) => {
									return { ...prev, password: event.target.value };
								})
							}
							required
							aria-required
						/>
						<div className="flex justify-end">
							<Link
								to="/user/reset-password"
								className="cursor-pointer border-b-2 border-transparent text-sm text-slate-400 hover:border-slate-600"
							>
								Forgot password?
							</Link>
						</div>
					</div>
					<Button
						disabled={!!userCredential.emailError || isLoading}
						className={'w-full text-xs sm:text-sm'}
						onClick={handleLogin}
					>
						{isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
						{isLoading ? 'Please wait' : constants.CTA_TEXT}
					</Button>
				</CardContent>
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
