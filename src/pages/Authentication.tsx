import React, { useState } from 'react';
import Signup from '../components/Signup/Signup';
import LogIn from '../components/LogIn/LogIn';
import { useParams } from 'react-router';

export enum USER_ACTION {
	LOGIN = 'login',
	SIGNUP = 'signup',
}

export default function Authentication() {
	const { action } = useParams();

	function getUserActionContent() {
		switch (action) {
			case USER_ACTION.LOGIN:
				return <LogIn />;
			case USER_ACTION.SIGNUP:
				return <Signup />;
		}
	}

	return (
		<div className="flex h-full w-full items-center justify-center">
			{getUserActionContent()}
		</div>
	);
}
