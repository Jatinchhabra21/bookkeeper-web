import React, { useState } from 'react';
import { Dialog, DialogContent } from '../../../components/ui/dialog';
import { SignUpDialogStage } from '../../constants/SignUpDialog.constants';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { toggleIsSignUpDialogVisible } from '../../store/slices/globalSlice';
import UserDetailDialogContent from '../UserDetailDialogContent/UserDetailDialogContent';
import OtpDialogContent from '../OtpDialogContent/OtpDialogContent';
import { setUserEmail } from '../../store/slices/authSlice';

export default function SignUpDialog() {
	const [signUpDialogStage, setSignUpDialogStage] = useState<SignUpDialogStage>(
		SignUpDialogStage.USER_DETAIL
	);

	const isSignUpDialogVisible = useAppSelector(
		(state) => state.global.isSignUpDialogVisible
	);

	const dispatch = useAppDispatch();

	function getDialogContent() {
		switch (signUpDialogStage) {
			case SignUpDialogStage.USER_DETAIL:
				return (
					<UserDetailDialogContent
						updateCurrentDialogStage={setSignUpDialogStage}
						nextDialogStage={SignUpDialogStage.OTP}
					/>
				);
			case SignUpDialogStage.OTP:
				return <OtpDialogContent />;
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
