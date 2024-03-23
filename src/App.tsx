import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import FullPageSpinner from './components/FullPageSpinner/FullPageSpinner';
import { Size } from './components/Spinner/Spinner.types';
import HomePage from './pages/HomePage';
import { Toaster } from '../components/ui/toaster';
import Transactions from './pages/Transactions';
import { AuthProvider } from './hooks/useAuth';
import Authentication from './pages/Authentication';

export default function App() {
	return (
		<Suspense fallback={<FullPageSpinner size={Size.normal} />}>
			<AuthProvider>
				<Toaster />
				<div className="relative flex h-screen flex-col overflow-x-hidden">
					<Header />
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/transactions" element={<Transactions />} />
						<Route path="/user/:action" element={<Authentication />} />
					</Routes>
				</div>
			</AuthProvider>
		</Suspense>
	);
}
