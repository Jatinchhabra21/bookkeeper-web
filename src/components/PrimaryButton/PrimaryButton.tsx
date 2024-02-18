import React from 'react';
import './styles.css';

export type PrimaryButtonPropType = {
	ctaText: string;
	ariaLabel?: string;
	disabled?: boolean;
};

export default function PrimaryButton({
	ctaText,
	ariaLabel,
	disabled,
}: PrimaryButtonPropType) {
	return (
		<button
			className="primary-btn btn"
			aria-label={ariaLabel}
			disabled={disabled}
		>
			{ctaText}
		</button>
	);
}
