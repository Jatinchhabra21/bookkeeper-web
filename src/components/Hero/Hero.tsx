import React, { useEffect, useRef } from 'react';
import constants from '../../constants/Hero.constants';
import { Button } from '../../../components/ui/button';
import './styles.css';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export default function Hero() {
	const timeline = useRef<gsap.core.Timeline | null>(null);

	useGSAP(
		() => {
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
		},
		{ dependencies: [], scope: '.blob' }
	);

	return (
		<div className=" background-img mx-auto my-16 text-slate-100 sm:w-4/5">
			<h1 className="mb-4 text-2xl font-thin text-slate-400 md:text-3xl lg:text-4xl">
				Bookkeeper
			</h1>
			<div className="blob relative -z-10">
				<div className="blob-1 absolute -left-4 -top-2 -z-20 h-5/6 w-9/12 rounded-full bg-purple-500 opacity-35 mix-blend-multiply blur-2xl filter"></div>
				<div className="blob-2 absolute right-4 top-8 -z-20 h-5/6 w-9/12 rounded-full bg-emerald-500 opacity-35 mix-blend-multiply blur-2xl filter"></div>
				<div className="blob-3 absolute -bottom-8 left-0 -z-20 h-5/6 w-9/12 rounded-full bg-yellow-500 opacity-35 mix-blend-multiply blur-2xl filter"></div>
				<p className="mb-8 text-3xl font-medium sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
					Empower your future, master your money: Smart finance, brighter
					tomorrows.
				</p>
			</div>
			<div className="flex gap-8">
				<Button className="rounded-md" variant="default">
					{constants.SIGNUP_CTA_TEXT}
				</Button>
				<Button variant="outline">{constants.LOGIN_CTA_TEXT}</Button>
			</div>
		</div>
	);
}
