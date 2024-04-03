import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import FullPageSpinner from './components/FullPageSpinner/FullPageSpinner';
import { Size } from './components/Spinner/Spinner.types';
import { Toaster } from '../components/ui/toaster';
import { AuthProvider } from './hooks/useAuth';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

const HomePage = lazy(() => import('./pages/HomePage'));
const Transactions = lazy(() => import('./pages/Transactions'));
const Authentication = lazy(() => import('./pages/Authentication'));

export default function App() {
	return (
		<Suspense fallback={<FullPageSpinner size={Size.normal} />}>
			<AuthProvider>
				<Toaster />
				<div className="relative flex h-screen flex-col overflow-x-hidden">
					<Header />
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route
							path="/transactions"
							element={
								<PrivateRoute>
									<Transactions />
								</PrivateRoute>
							}
						/>
						<Route path="/user/:action" element={<Authentication />} />
					</Routes>
				</div>
			</AuthProvider>
		</Suspense>
	);
}
