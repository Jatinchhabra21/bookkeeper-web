import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header, FullPageSpinner } from './components';
import { Size } from './components/Spinner/Spinner.types';
import { useAppSelector } from './store/hooks';
import HomePage from './pages/HomePage';
import SignUpDialog from './components/SignUpDialog/SignUpDialog';

export default function App() {
	const isSignUpDialogVisible = useAppSelector(
		(state) => state.global.isSignUpDialogVisible
	);

	return (
		<Suspense fallback={<FullPageSpinner size={Size.normal} />}>
			{isSignUpDialogVisible && <SignUpDialog />}
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
