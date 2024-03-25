import React, { useState } from 'react';
import Signup from '../components/Signup/Signup';
import LogIn from '../components/LogIn/LogIn';
import { useParams } from 'react-router';
import ResetPassword from '../components/ResetPassword/ResetPassword';

export enum USER_ACTION {
	LOGIN = 'login',
	SIGNUP = 'signup',
	RESET_PASSWORD = 'reset-password',
}

export default function Authentication() {
	const { action } = useParams();

	function getUserActionContent() {
		switch (action) {
			case USER_ACTION.LOGIN:
				return <LogIn />;
			case USER_ACTION.SIGNUP:
				return <Signup />;
			case USER_ACTION.RESET_PASSWORD:
				return <ResetPassword />;
		}
	}

	return (
		<div className="flex h-full w-full items-center justify-center">
			{getUserActionContent()}
		</div>
	);
}
