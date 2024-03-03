import React, { useState } from 'react';
import { Dialog, DialogContent } from '../../../components/ui/dialog';
import { SignUpDialogStage } from '../../constants/SignUpDialog.constants';
import { useAppDispatch } from '../../store/hooks';
import { toggleIsSignUpDialogVisible } from '../../store/slices/globalSlice';
import UserDetailDialogContent from '../UserDetailDialogContent/UserDetailDialogContent';
import OtpDialogContent from '../OtpDialogContent/OtpDialogContent';
import { setSignUpDetails } from '../../store/slices/authSlice';

export type SignUpDialogProps = {
	initialDialogStage: SignUpDialogStage;
	isVisible: boolean;
};

export default function SignUpDialog({
	initialDialogStage,
	isVisible,
}: SignUpDialogProps) {
	const [dialogStage, setDialogStage] =
		useState<SignUpDialogStage>(initialDialogStage);

	const dispatch = useAppDispatch();

	function getDialogContent() {
		switch (dialogStage) {
			case SignUpDialogStage.USER_DETAIL:
				return (
					<UserDetailDialogContent
						updateCurrentDialogStage={setDialogStage}
						nextDialogStage={SignUpDialogStage.OTP}
					/>
				);
			case SignUpDialogStage.OTP:
				return <OtpDialogContent />;
		}
	}

	function componentWillUnmount() {
		dispatch(setSignUpDetails(undefined));
		dispatch(toggleIsSignUpDialogVisible());
	}

	return (
		<Dialog open={isVisible} onOpenChange={componentWillUnmount}>
			<DialogContent>{getDialogContent()}</DialogContent>
		</Dialog>
	);
}
