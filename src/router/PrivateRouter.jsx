import React from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '@/contexts/AuthContextProvider';
import { useContext } from 'react';

// This component is used to wrap the routes that are only accessible to logged in users
//will redirect to login page if user is not logged in
export const PrivateRouter = () => {
	const { authInfo } = useContext(AuthContext);
	if (!authInfo.loggedIn) {
		return <Navigate to='/login' />;
	}
	return <Outlet />;
};
