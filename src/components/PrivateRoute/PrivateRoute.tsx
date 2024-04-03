import React, { useContext } from 'react';
import { authContext } from '../../hooks/useAuth';
import { Navigate, Route } from 'react-router-dom';

const PrivateRoute = ({ children }: { children: any }) => {
	const { authenticatedUser } = useContext(authContext);
	return authenticatedUser ? (
		children
	) : (
		<Navigate to={{ pathname: '/user/login' }} replace={true} />
	);
};

export default PrivateRoute;
