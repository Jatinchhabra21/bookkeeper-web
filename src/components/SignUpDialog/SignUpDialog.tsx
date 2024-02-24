import React, { useEffect, useState } from 'react';
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
} from '../../../components/ui/dialog';
import { SignUpDialogStage } from '../../constants/SignUpDialog.constants';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { toggleIsSignUpDialogVisible } from '../../store/slices/globalSlice';
import EmailDialogContent from '../EmailDialogContent/EmailDialogContent';
import OtpDialogContent from '../OtpDialogContent/OtpDialogContent';
import { setUserEmail } from '../../store/slices/authSlice';
import PasswordDialogContent from '../PasswordDialogContent/PasswordDialogContent';

export default function SignUpDialog() {
	const [signUpDialogStage, setSignUpDialogStage] = useState<SignUpDialogStage>(
		SignUpDialogStage.EMAIL
	);

	const isSignUpDialogVisible = useAppSelector(
		(state) => state.global.isSignUpDialogVisible
	);

	const dispatch = useAppDispatch();

	function getDialogContent() {
		switch (signUpDialogStage) {
			case SignUpDialogStage.EMAIL:
				return (
					<EmailDialogContent
						updateCurrentDialogStage={setSignUpDialogStage}
						nextDialogStage={SignUpDialogStage.OTP}
					/>
				);
			case SignUpDialogStage.OTP:
				return (
					<OtpDialogContent
						updateCurrentDialogStage={setSignUpDialogStage}
						nextDialogStage={SignUpDialogStage.PASSWORD}
					/>
				);
			case SignUpDialogStage.PASSWORD:
				return <PasswordDialogContent />;
		}
	}

	function componentWillUnmount() {
		dispatch(toggleIsSignUpDialogVisible());
		dispatch(setUserEmail(''));
	}

	return (
		<Dialog open={isSignUpDialogVisible} onOpenChange={componentWillUnmount}>
			<DialogContent>{getDialogContent()}</DialogContent>
		</Dialog>
	);
}
