import React, { useState } from 'react';
import './styles.css';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Navlink from '../Navlink/Navlink';
import { Button } from '../../../components/ui/button';
import heroConstants from '../../constants/Hero.constants';
import headerConstants from '../../constants/Header.constants';
import { useAppDispatch } from '../../store/hooks';
import {
	toggleIsLogInDialogVisible,
	toggleIsSignUpDialogVisible,
} from '../../store/slices/globalSlice';

export default function Header() {
	const [isNavExpanded, setIsNavExpanded] = useState<boolean>(false);
	const { contextSafe } = useGSAP();
	const dispatch = useAppDispatch();

	const handleHamburgerClick = contextSafe(() => {
		if (!isNavExpanded) {
			gsap.to('.bar-1', { rotate: -45, y: 10 });
			gsap.to('.bar-2', { opacity: 0 });
			gsap.to('.bar-3', { rotate: 45, y: -10 });
			gsap.to('.navbar', {
				translateX: '0',
				duration: 0.35,
			});
			setIsNavExpanded(true);
		} else {
			gsap.to('.bar-1', { rotate: 0, y: 0 });
			gsap.to('.bar-2', { opacity: 1 });
			gsap.to('.bar-3', { rotate: 0, y: 0 });
			gsap.to('.navbar', {
				translateX: '100%',
				duration: 0.35,
				onComplete: () => setIsNavExpanded(false),
			});
		}
	});

	return (
		<header className="sticky top-0 z-10 mb-8 w-screen border-b border-border/10 border-b-slate-800 bg-[#020817]/60 text-white sm:mb-16 ">
			<div className="flex items-center justify-between px-8 py-4 backdrop-blur supports-[backdrop-filter]:bg-[#020817]/60">
				<span className="cursor-pointer text-base font-medium">
					<a href="/">{headerConstants.BOOKKEEPER}</a>
				</span>
				<div className="flex items-center justify-between sm:hidden">
					<div className="z-[9999]" onClick={handleHamburgerClick}>
						<div className="bar bar-1 bg-white"></div>
						<div className="bar bar-2 bg-white"></div>
						<div className="bar bar-3 bg-white"></div>
					</div>
				</div>
				<aside
					className={`navbar absolute right-0 top-0 z-[1000] flex h-screen max-h-screen w-2/3 translate-x-full flex-col justify-between gap-10 bg-[#020817] px-8 font-light text-white ${!isNavExpanded && 'hidden'} sm:static sm:flex sm:h-fit sm:translate-x-0 sm:flex-row sm:items-center sm:justify-end sm:bg-transparent sm:p-0`}
				>
					<nav className="flex flex-col gap-6 sm:flex-row">
						<Navlink
							text={headerConstants.NAV_LINK_TRANSACTIONS}
							url="/transactions"
						/>
						<Navlink text={headerConstants.NAV_LINK_GOALS} />
						<Navlink text={headerConstants.NAV_LINK_BUDGET} />
						<Navlink text={headerConstants.NAV_LINK_BILLS} />
					</nav>
					<div className="flex flex-col justify-between gap-4 sm:flex-row">
						<Button
							variant="default"
							onClick={() => dispatch(toggleIsSignUpDialogVisible())}
						>
							{heroConstants.SIGNUP_CTA_TEXT}
						</Button>
						<Button
							variant="secondary"
							onClick={() => dispatch(toggleIsLogInDialogVisible())}
						>
							{heroConstants.LOGIN_CTA_TEXT}
						</Button>
					</div>
				</aside>
			</div>
		</header>
	);
}
