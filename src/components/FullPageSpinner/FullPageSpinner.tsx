import React from 'react';
import Spinner from '../Spinner/Spinner';
import { Size } from '../Spinner/Spinner.types';

export interface IFullPageSpinner {
	size: Size;
}

export default function FullPageSpinner({ size }: IFullPageSpinner) {
	return (
		<div className="z-20 h-screen w-screen flex items-center justify-center">
			<Spinner size={size} />
		</div>
	);
}
