import React from 'react';
import './styles.css';
import gsap from 'gsap';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { toggleIsNavExpanded } from '../../store/slices/globalSlice';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import Navlink from '../Navlink/Navlink';

export default function Header() {
	const isNavExpanded = useAppSelector((state) => state.global.isNavExpanded);
	const dispatch = useAppDispatch();
	const container = useRef(null);
	const navbar = useRef(null);
	const { contextSafe } = useGSAP({ scope: container });

	const handleHamburgerClick = contextSafe(() => {
		if (!isNavExpanded) {
			gsap.to('.bar-1', { rotate: -45, y: 10 });
			gsap.to('.bar-2', { opacity: 0 });
			gsap.to('.bar-3', { rotate: 45, y: -10 });
		} else {
			gsap.to('.bar-1', { rotate: 0, y: 0 });
			gsap.to('.bar-2', { opacity: 1 });
			gsap.to('.bar-3', { rotate: 0, y: 0 });
		}
		dispatch(toggleIsNavExpanded());
	});

	return (
		<header className="text-white">
			<div className="header-wrapper flex items-center justify-between bg-gray-dark p-4">
				<span className="text-lg font-medium">Bookkeeper</span>
				<div className="flex items-center justify-between">
					<div
						className="z-50 sm:hidden"
						onClick={handleHamburgerClick}
						ref={container}
					>
						<div className="bar bar-1 bg-white"></div>
						<div className="bar bar-2 bg-white"></div>
						<div className="bar bar-3 bg-white"></div>
					</div>
				</div>
				<aside
					className={`navbar fixed right-0 top-0 z-10 h-screen w-2/3 translate-x-full bg-gray-dark px-6 font-light text-white opacity-0 sm:static sm:flex sm:h-fit sm:justify-end sm:bg-opacity-0 sm:py-0 ${isNavExpanded ? 'flex' : 'hidden'}`}
				>
					<nav className="z-10 flex flex-col items-start gap-8 sm:flex-row">
						<Navlink text="transactions" />
						<Navlink text="goals" />
						<Navlink text="budget" />
						<Navlink text="bills" />
					</nav>
				</aside>
			</div>
		</header>
	);
}
