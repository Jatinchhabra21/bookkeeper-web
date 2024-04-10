'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { cn } from '../../../lib/utils';
import { Button } from '../../../components/ui/button';
import { Calendar } from '../../../components/ui/calendar';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '../../../components/ui/popover';

type DatePickerPropType = {
	date: Date;
	setDate: (date: Date | undefined) => void;
	className?: string;
};

export function DatePicker({ date, setDate, className }: DatePickerPropType) {
	const [calendarOpen, setCalendarOpen] = React.useState<boolean>(false);

	return (
		<Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
			<PopoverTrigger asChild>
				<Button
					variant={'outline'}
					className={cn(
						'w-fit justify-center text-left font-normal',
						!date && 'text-muted-foreground',
						className ?? ''
					)}
				>
					<CalendarIcon className="mr-2 h-4 min-w-4" />
					{date ? format(date, 'PPP') : <span>Pick a date</span>}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="p-0 w-auto">
				<Calendar
					mode="single"
					selected={date}
					onSelect={(date) => {
						setDate(date);
						setCalendarOpen(false);
					}}
					initialFocus
				/>
			</PopoverContent>
		</Popover>
	);
}
