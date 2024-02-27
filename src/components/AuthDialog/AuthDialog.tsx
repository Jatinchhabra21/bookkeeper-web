import React, { useState } from 'react';
import { Dialog, DialogContent } from '../../../components/ui/dialog';
import { DialogStage } from '../../constants/SignUpDialog.constants';
import { useAppDispatch } from '../../store/hooks';
import { toggleIsSignUpDialogVisible } from '../../store/slices/globalSlice';
import UserDetailDialogContent from '../UserDetailDialogContent/UserDetailDialogContent';
import OtpDialogContent from '../OtpDialogContent/OtpDialogContent';
import { setUserEmail } from '../../store/slices/authSlice';

export type AuthDialogProps = {
	initialDialogStage: DialogStage;
	isVisible: boolean;
};

export default function AuthDialog({
	initialDialogStage,
	isVisible,
}: AuthDialogProps) {
	const [dialogStage, setDialogStage] =
		useState<DialogStage>(initialDialogStage);

	const dispatch = useAppDispatch();

	function getDialogContent() {
		switch (dialogStage) {
			case DialogStage.USER_DETAIL:
				return (
					<UserDetailDialogContent
						updateCurrentDialogStage={setDialogStage}
						nextDialogStage={DialogStage.OTP}
					/>
				);
			case DialogStage.OTP:
				return <OtpDialogContent />;
		}
	}

	function componentWillUnmount() {
		dispatch(toggleIsSignUpDialogVisible());
		dispatch(setUserEmail(''));
	}

	return (
		<Dialog open={isVisible} onOpenChange={componentWillUnmount}>
			<DialogContent>{getDialogContent()}</DialogContent>
		</Dialog>
	);
}
