import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Spinner from './components/Spinner/Spinner';
import FullPageSpinner from './components/FullPageSpinner/FullPageSpinner';
import { Size } from './components/Spinner/Spinner.types';
import LeftNavigation from './components/LeftNavigation/LeftNavigation';

export default function App() {
	return (
		<Suspense fallback={<FullPageSpinner size={Size.normal} />}>
			<LeftNavigation />
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Spinner size={Size.small} />} />
				</Routes>
			</BrowserRouter>
		</Suspense>
	);
}
