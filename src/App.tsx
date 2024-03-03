import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header, FullPageSpinner } from './components';
import { Size } from './components/Spinner/Spinner.types';
import { useAppSelector } from './store/hooks';
import HomePage from './pages/HomePage';
import SignUpDialog from './components/SignUpDialog/SignUpDialog';
import { SignUpDialogStage } from './constants/SignUpDialog.constants';
import { Toaster } from '../components/ui/toaster';
import LogInDialog from './components/LogInDialog/LogInDialog';
import { LogInDialogStage } from './constants/LogInDialog.constants';

export default function App() {
	const { isSignUpDialogVisible, isLogInDialogVisible } = useAppSelector(
		(state) => state.global
	);

	return (
		<Suspense fallback={<FullPageSpinner size={Size.normal} />}>
			<Toaster />
			{isSignUpDialogVisible && (
				<SignUpDialog
					initialDialogStage={SignUpDialogStage.USER_DETAIL}
					isVisible={isSignUpDialogVisible}
				/>
			)}
			{isLogInDialogVisible && (
				<LogInDialog
					initialDialogStage={LogInDialogStage.USER_CREDENTIAL}
					isVisible={isLogInDialogVisible}
				/>
			)}
			<div className="flex h-screen flex-col">
				<Header />
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<HomePage />} />
					</Routes>
				</BrowserRouter>
			</div>
		</Suspense>
	);
}
