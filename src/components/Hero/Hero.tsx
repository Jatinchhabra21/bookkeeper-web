import React from 'react';
import PrimaryButton from '../PrimaryButton/PrimaryButton';
import { constants } from '../../constants/Hero.constants';
import DefaultButton from '../DefaultButton/DefaultButton';

export default function Hero() {
	return (
		<div>
			<h2>Manage your money, your way</h2>
			<p>Join over 11 million members and take control of your finances</p>
			<PrimaryButton
				ctaText={constants.SIGNUP_CTA_TEXT}
				ariaLabel={constants.SIGNUP_CTA_TEXT}
			/>
			<DefaultButton
				ctaText={constants.LOGIN_CTA_TEXT}
				ariaLabel={constants.LOGIN_CTA_TEXT}
			/>
		</div>
	);
}
