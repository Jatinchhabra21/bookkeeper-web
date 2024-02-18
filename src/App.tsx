import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FullPageSpinner, Header } from './components';
import { Size } from './components/Spinner/Spinner.types';
import { useAppSelector } from './store/hooks';
import HomePage from './pages/HomePage';

export default function App() {
	const isNavExpanded = useAppSelector((state) => state.global.isNavExpanded);

	return (
		<Suspense fallback={<FullPageSpinner size={Size.normal} />}>
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
