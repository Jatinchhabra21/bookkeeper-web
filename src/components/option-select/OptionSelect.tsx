import React, { Dispatch, SetStateAction, useState } from 'react';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '../../../components/ui/popover';
import { Button } from '../../../components/ui/button';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '../../../lib/utils';

type OptionSelectPropType = {
	options: string[];
	ctaText: string;
	option: string | null | undefined;
	setOption: Dispatch<SetStateAction<string | null | undefined>>;
};

export default function OptionSelect({
	options,
	ctaText,
	option,
	setOption,
}: OptionSelectPropType) {
	const [open, setOpen] = useState<boolean>(false);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="w-[190px] justify-between overflow-hidden capitalize"
				>
					{option ?? ctaText}
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[190px] p-0">
				<div className="flex cursor-pointer flex-col">
					{options.map((value) => {
						return (
							<Button
								key={value}
								name={value}
								variant="ghost"
								onClick={(event) => {
									setOption((prevOption) => {
										return prevOption ===
											event.currentTarget.firstChild?.textContent
											? null
											: event.currentTarget.firstChild?.textContent;
									});
									setOpen(false);
								}}
								className="rounded-none"
								asChild
							>
								<div className="flex justify-between capitalize">
									{value}
									<Check
										className={cn(
											'mr-2 h-4 w-4',
											value === option ? 'opacity-100' : 'opacity-0'
										)}
									/>
								</div>
							</Button>
						);
					})}
				</div>
			</PopoverContent>
		</Popover>
	);
}
