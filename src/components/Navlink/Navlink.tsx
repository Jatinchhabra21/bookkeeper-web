import { Link } from 'react-router-dom';
import './styles.css';

export type NavlinkPropType = {
	text: string;
	url?: string;
};

export default function Navlink({ text, url }: NavlinkPropType) {
	return (
		<span className="capitalize">
			<Link
				className="hover-underline navlink max-w-fit cursor-pointer text-base sm:text-sm"
				to={url ?? '/'}
			>
				{text}
			</Link>
		</span>
	);
}
