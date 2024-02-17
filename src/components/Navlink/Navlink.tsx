import './styles.css';

export type NavlinkPropType = {
	text: string;
	url?: string;
};

export default function Navlink({ text, url }: NavlinkPropType) {
	return (
		<span className="capitalize">
			<a className="hover-underline cursor-pointer text-base" href={url ?? '#'}>
				{text}
			</a>
		</span>
	);
}
