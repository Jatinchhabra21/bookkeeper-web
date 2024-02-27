import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header, FullPageSpinner } from './components';
import { Size } from './components/Spinner/Spinner.types';
import { useAppSelector } from './store/hooks';
import HomePage from './pages/HomePage';
import AuthDialog from './components/AuthDialog/AuthDialog';
import { DialogStage } from './constants/SignUpDialog.constants';

export default function App() {
	const isSignUpDialogVisible = useAppSelector(
		(state) => state.global.isSignUpDialogVisible
	);

	return (
		<Suspense fallback={<FullPageSpinner size={Size.normal} />}>
			{isSignUpDialogVisible && (
				<AuthDialog
					initialDialogStage={DialogStage.USER_DETAIL}
					isVisible={isSignUpDialogVisible}
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
