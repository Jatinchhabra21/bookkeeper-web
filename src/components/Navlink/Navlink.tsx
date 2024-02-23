import './styles.css';

export type NavlinkPropType = {
	text: string;
	url?: string;
};

export default function Navlink({ text, url }: NavlinkPropType) {
	return (
		<span className="capitalize">
			<a
				className="hover-underline navlink max-w-fit cursor-pointer text-base sm:text-sm"
				href={url ?? '#'}
			>
				{text}
			</a>
		</span>
	);
}
