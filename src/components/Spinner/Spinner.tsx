import React from 'react';
import './styles.css';
import { ISpinnerProps } from './Spinner.types';

export default function Spinner({ size }: ISpinnerProps) {
	return (
		<div className={`lds-ring ${size}`}>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	);
}
