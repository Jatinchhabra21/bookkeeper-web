import { useEffect, useState } from 'react';
import {
	Sheet,
	SheetTitle,
	SheetFooter,
	SheetContent,
	SheetHeader,
	SheetClose,
	SheetOverlay,
	SheetTrigger,
	SheetDescription,
} from '../../../components/ui/sheet';
import { Input } from '../../../components/ui//input';
import { Button } from '../../../components/ui/button';
import {
	CreateTransactionRequest,
	TransactionCategory,
	TransactionType,
} from '../DataTable/DataTable.types';
import { DatePicker } from '../DatePicker/DatePicker';
import OptionSelect from '../option-select/OptionSelect';
import { useCreateTransactionsMutation } from '../../store/slices/apiSlice';
import { ReloadIcon } from '@radix-ui/react-icons';

type TransactionSheetPropType = {
	mode: 'Add' | 'Edit';
};

export default function TransactionSheet({ mode }: TransactionSheetPropType) {
	const [transaction, setTransaction] = useState<CreateTransactionRequest>({
		name: '',
		amount: 0,
		date: new Date(),
	} as CreateTransactionRequest);
	const [category, setCategory] = useState<string | null | undefined>();

	const [createTransaction, { isLoading: creatingTransaction }] =
		useCreateTransactionsMutation();

	const [open, setOpen] = useState<boolean>(false);

	const setDate = (date: Date | undefined) => {
		console.log(date);
		setTransaction((prev) => {
			return {
				...prev,
				date: date ?? new Date(),
			};
		});
	};

	useEffect(() => {
		if (!open) setTransaction({} as CreateTransactionRequest);
		setCategory(undefined);
	}, [open]);

	// TODO: Add validations
	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>
				<Button variant="default">Add</Button>
			</SheetTrigger>
			<SheetOverlay />
			<SheetContent className="flex flex-col justify-between">
				<div>
					<SheetHeader>
						<SheetTitle>
							{mode === 'Add' ? 'Add transactions' : 'Edit Transactions'}
						</SheetTitle>
						<SheetDescription>
							{mode === 'Add'
								? 'Create a new transaction'
								: 'Editing an old transaction'}
						</SheetDescription>
					</SheetHeader>
					<div className="flex flex-col gap-4 mt-8">
						<Input
							type="text"
							placeholder="Name"
							value={transaction.name}
							onChange={(event) =>
								setTransaction((prev) => {
									return {
										...prev,
										name: event.currentTarget.value,
									};
								})
							}
						/>
						<Input
							type="number"
							placeholder="Amount"
							value={transaction.amount}
							onChange={(event) =>
								setTransaction((prev) => {
									return {
										...prev,
										amount: parseInt(event.target.value, undefined),
									};
								})
							}
						/>
						<div className="flex gap-4">
							<DatePicker date={transaction.date} setDate={setDate} />
							<OptionSelect
								ctaText="Category"
								options={Object.values(TransactionCategory)}
								setOption={setCategory}
								option={category}
							/>
						</div>
					</div>
				</div>
				<SheetFooter>
					<Button
						variant="default"
						onClick={() =>
							createTransaction({
								name: transaction.name,
								amount: transaction.amount,
								category: category,
								date: transaction.date,
								type: TransactionType.DEBIT,
							} as CreateTransactionRequest).then(() => setOpen(false))
						}
					>
						{creatingTransaction && (
							<ReloadIcon className="mr-2 w-4 h-4 animate-spin" />
						)}
						{creatingTransaction ? 'Please wait' : 'Save'}
					</Button>
					<SheetClose asChild>
						<Button variant="secondary">Cancel</Button>
					</SheetClose>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}
