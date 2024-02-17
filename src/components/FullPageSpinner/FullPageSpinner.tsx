import React from 'react';
import Spinner from '../Spinner/Spinner';
import { Size } from '../Spinner/Spinner.types';

export type FullPageSpinnerPropType = {
	size: Size;
};

export default function FullPageSpinner({ size }: FullPageSpinnerPropType) {
	return (
		<div className="z-50 flex h-screen w-screen items-center justify-center">
			<Spinner size={size} />
		</div>
	);
}
