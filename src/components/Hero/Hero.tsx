import React, { useRef } from 'react';
import constants from '../../constants/Hero.constants';
import { Button } from '../../../components/ui/button';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import headerConstants from '../../constants/Header.constants';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
	const timeline = useRef<gsap.core.Timeline | null>(null);
	const navigate = useNavigate();

	useGSAP(() => {
		timeline.current = gsap
			.timeline()
			.add('start')
			.to(
				'.blob-1',
				{ scale: 1.1, translateX: '25%', translateY: '5%', duration: 5 },
				'start'
			)
			.to(
				'.blob-2',
				{ scale: 1.1, translateX: '-35%', translateY: '-5%', duration: 5 },
				'start'
			)
			.to(
				'.blob-3',
				{ scale: 1.1, translateX: '25%', translateY: '5%', duration: 5 },
				'start'
			)
			.repeat(-1)
			.yoyo(true);
	});

	return (
		<div className=" background-img mx-auto my-16 text-slate-100 sm:my-16 sm:w-4/5 md:my-12">
			<h1 className="mb-4 text-2xl font-thin text-slate-400 md:text-3xl xl:text-4xl">
				{headerConstants.BOOKKEEPER}
			</h1>
			<div className="relative -z-10">
				<div className="blob-1 absolute -left-4 -top-2 -z-20 h-5/6 w-9/12 rounded-full bg-purple-500 opacity-35 mix-blend-multiply blur-2xl filter"></div>
				<div className="blob-2 absolute right-4 top-8 -z-20 h-5/6 w-9/12 rounded-full bg-emerald-500 opacity-35 mix-blend-multiply blur-2xl filter"></div>
				<div className="blob-3 absolute -bottom-8 left-0 -z-20 h-5/6 w-9/12 rounded-full bg-yellow-500 opacity-35 mix-blend-multiply blur-2xl filter"></div>
				<p className="mb-8 text-3xl font-medium sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl">
					{constants.TAGLINE}
				</p>
			</div>
			<div className="flex gap-8">
				<Button variant="default" onClick={() => navigate('/user/signup')}>
					{constants.SIGNUP_CTA_TEXT}
				</Button>
				<Button variant="outline" onClick={() => navigate('/user/login')}>
					{constants.LOGIN_CTA_TEXT}
				</Button>
			</div>
		</div>
	);
}
