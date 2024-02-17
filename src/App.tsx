import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar, FullPageSpinner, Header } from './components';
import { Size } from './components/Spinner/Spinner.types';
import { useAppSelector } from './store/hooks';

export default function App() {
	const isNavExpanded = useAppSelector((state) => state.global.isNavExpanded);

	return (
		<Suspense fallback={<FullPageSpinner size={Size.normal} />}>
			<Header />
			{isNavExpanded && <Navbar />}
			{/* <BrowserRouter>
				<Routes>
					<Route path="/" element={<Spinner size={Size.small} />} />
				</Routes>
			</BrowserRouter> */}
		</Suspense>
	);
}
