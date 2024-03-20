import { Dialog, DialogContent } from '../../../components/ui/dialog';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { LogInDialogStage } from '../../constants/LogInDialog.constants';
import { setIsLogInVisible } from '../../store/slices/globalSlice'; // TODO: Fix sign in reducer action
import UserCredentialDialogContent from '../UserCredentialDialogContent/UserCredentialDialogContent';

export type LogInDialogProps = {
	isVisible: boolean;
	initialDialogStage: LogInDialogStage;
};

export default function LogInDialog({
	isVisible,
	initialDialogStage,
}: LogInDialogProps) {
	const [dialogStage, setDialogStage] =
		useState<LogInDialogStage>(initialDialogStage);
	const dispatch = useDispatch();

	function getDialogContent() {
		switch (dialogStage) {
			case LogInDialogStage.USER_CREDENTIAL:
				return <UserCredentialDialogContent />;
			case LogInDialogStage.RESET_PASSWORD:
				return <></>;
		}
	}

	function componentWillUnmount() {
		dispatch(setIsLogInVisible(false));
	}

	return (
		<Dialog open={isVisible} onOpenChange={componentWillUnmount}>
			<DialogContent>{getDialogContent()}</DialogContent>
		</Dialog>
	);
}
