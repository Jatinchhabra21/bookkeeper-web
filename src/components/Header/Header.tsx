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
			<div className="flex items-center justify-between bg-gray-dark p-4">
				<span className="text-lg font-medium">Bookkeeper</span>
				<nav className="hidden gap-[2vw] border-b-[2] sm:flex">
					<Navlink text="transactions" />
					<Navlink text="goals" />
					<Navlink text="budget" />
					<Navlink text="bills" />
				</nav>
				<div
					className="bar-wrapper sm:hidden"
					onClick={handleHamburgerClick}
					ref={container}
				>
					<div className="bar bar-1 bg-white"></div>
					<div className="bar bar-2 bg-white"></div>
					<div className="bar bar-3 bg-white"></div>
				</div>
			</div>
		</header>
	);
}
