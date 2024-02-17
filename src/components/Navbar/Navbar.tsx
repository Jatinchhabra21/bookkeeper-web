import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Navlink from '../Navlink/Navlink';

export default function Navbar() {
	useGSAP(() => {
		gsap.to('.navbar', { translateX: '0', opacity: 1, duration: 0.5 });
	});

	return (
		<aside className="h-fill-available navbar z-50 ml-auto w-2/3 translate-x-2/3 overflow-hidden bg-gray-light px-6 py-8 font-light text-white opacity-0 sm:hidden">
			<nav className="flex flex-col items-start gap-8 border-b-[2] backdrop-blur">
				<Navlink text="transactions" />
				<Navlink text="goals" />
				<Navlink text="budget" />
				<Navlink text="bills" />
			</nav>
		</aside>
	);
}
