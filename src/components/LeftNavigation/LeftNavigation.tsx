import React, { useState, KeyboardEvent, useRef } from 'react';
import './styles.css';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export default function LeftNavigation() {
	const [isExpanded, setIsExpanded] = useState(false);
	const expandBtnBarWrapper = useRef(null);
	const tl = useRef<any>();

	const animationDuration: number = 0.175;

	useGSAP(
		() => {
			debugger;
			const bars: EventTarget[] = gsap.utils.toArray('.bar');
			tl.current = gsap
				.timeline()
				.add('start')
				.to(bars[0], { y: '11px', rotate: '-45deg' }, 'start')
				.to(bars[1], { opacity: 0 }, 'start')
				.to(bars[2], { y: '-11px', rotate: '45deg' }, 'start')
				.reverse();
			tl.current.duration(animationDuration);
		},
		{ scope: expandBtnBarWrapper }
	);

	const handleExpandToggle = () => {
		setIsExpanded((prev) => !prev);
		tl.current.reversed(!tl.current.reversed());
	};

	const expandBtn = (
		<div
			role="button"
			tabIndex={0}
			className="expand-btn__bar-wrapper"
			onClick={handleExpandToggle}
			onKeyDown={(event: KeyboardEvent<HTMLElement>) => {
				if (event.key === 'Enter') {
					event.preventDefault();
					handleExpandToggle();
				}
			}}
			ref={expandBtnBarWrapper}
		>
			<div className="bar" />
			<div className="bar" />
			<div className="bar" />
		</div>
	);

	const expandedLeftNav = (
		<div className="flex">
			{expandBtn}
			<div>
				<div className="font-medium text-2xl">
					<span className="text-orange">Book</span>
					<span className="text-blue">keeper</span>
				</div>
			</div>
		</div>
	);

	return isExpanded ? expandedLeftNav : expandBtn;
}
