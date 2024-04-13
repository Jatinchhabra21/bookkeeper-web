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
	Transaction,
} from '../DataTable/DataTable.types';
import { DatePicker } from '../DatePicker/DatePicker';
import OptionSelect from '../option-select/OptionSelect';
import {
	useCreateTransactionsMutation,
	useDeleteTransactionMutation,
	useUpdateTransactionMutation,
} from '../../store/slices/apiSlice';
import { ReloadIcon, TrashIcon } from '@radix-ui/react-icons';
import { useToast } from '../../../components/ui/use-toast';

type TransactionSheetPropType = {
	mode: 'Add' | 'Edit';
	open: boolean;
	transaction?: Transaction;
	setOpen: any;
};

export default function TransactionSheet(props: TransactionSheetPropType) {
	const [transaction, setTransaction] = useState<Transaction>(
		{} as Transaction
	);
	const [category, setCategory] = useState<string | null | undefined>();

	const [createTransaction, { isLoading: creatingTransaction }] =
		useCreateTransactionsMutation();

	const [updateTransaction, { isLoading: updatingTransaction }] =
		useUpdateTransactionMutation();

	const [deleteTransaction, { isLoading: deletingTransaction }] =
		useDeleteTransactionMutation();

	const isLoading = creatingTransaction || updatingTransaction;

	const { toast } = useToast();

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
		if (props.transaction) {
			setTransaction(props.transaction);
			setCategory(props.transaction?.category);
		}
	}, [props.transaction]);

	useEffect(() => {
		if (!props.open) {
			setTransaction({} as Transaction);
			setCategory(undefined);
		}
	}, [props.open]);

	// TODO: Add validations
	return (
		<Sheet open={props.open} onOpenChange={props.setOpen}>
			{props.mode === 'Add' && (
				<SheetTrigger asChild>
					<Button variant="default">Add</Button>
				</SheetTrigger>
			)}
			<SheetOverlay />
			<SheetContent className="flex flex-col justify-between">
				<div>
					<SheetHeader>
						<SheetTitle>
							{props.mode === 'Add' ? 'Add transactions' : 'Edit Transactions'}
						</SheetTitle>
						<SheetDescription className="flex items-center justify-between">
							{props.mode === 'Add'
								? 'Create a new transaction'
								: 'Editing an old transaction'}
							{props.mode === 'Edit' && (
								<Button
									variant="outline"
									size="icon"
									onClick={() => {
										props.transaction &&
											deleteTransaction(props.transaction.id)
												.unwrap()
												.then(() => props.setOpen(false))
												.catch((error) => {
													toast({
														title: 'Uh oh! Something went wrong.',
														description: error.data.ErrorMessage,
													});
												});
									}}
									disabled={deletingTransaction}
								>
									<TrashIcon className="h-4 w-4" />
								</Button>
							)}
						</SheetDescription>
					</SheetHeader>
					<div className="mt-8 flex flex-col gap-4">
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
						disabled={isLoading || deletingTransaction}
						onClick={() => {
							props.mode === 'Add'
								? createTransaction({
									name: transaction.name,
									amount: transaction.amount,
									category: category,
									date: transaction.date,
									type: TransactionType.DEBIT,
								} as CreateTransactionRequest)
									.unwrap()
									.then(() => props.setOpen(false))
									.catch((error) => {
										toast({
											title: 'Uh oh! Something went wrong.',
											description: error.data.ErrorMessage,
										});
									})
								: updateTransaction({
									name: transaction.name,
									date: transaction.date,
									category: category ? category : transaction.category,
									amount: transaction.amount,
									id: transaction.id,
									type: transaction.type,
								})
									.unwrap()
									.then(() => props.setOpen(false))
									.catch((error) => {
										toast({
											title: 'Uh oh! Something went wrong.',
											description: error.data.ErrorMessage,
										});
									});
						}}
					>
						{isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
						{isLoading ? 'Please wait' : 'Save'}
					</Button>
					<SheetClose asChild>
						<Button variant="secondary">Cancel</Button>
					</SheetClose>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}
