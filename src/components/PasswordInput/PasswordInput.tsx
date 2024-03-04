import { Input } from '../../../components/ui/input';
import React, { ChangeEvent, useState } from 'react';
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons';

export type PasswordInputPropsType = {
	value: string;
	error?: string;
	placeholder?: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	onBlur?: () => void;
	required: boolean;
};

export default function PasswordInput({
	value,
	error,
	placeholder,
	onChange,
	onBlur,
	required,
}: PasswordInputPropsType) {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

	return (
		<div className="relative flex">
			<Input
				type={isPasswordVisible ? 'text' : 'password'}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				onBlur={onBlur}
				className={`${error ? 'outline outline-1 outline-offset-2 outline-red-600' : ''} flex-1 tracking-wide`}
				required={required}
				aria-required={required}
			/>
			{isPasswordVisible ? (
				<EyeOpenIcon
					className="absolute right-4 top-1/4 cursor-pointer"
					onClick={() => setIsPasswordVisible(false)}
				/>
			) : (
				<EyeClosedIcon
					className="absolute right-4 top-1/4 cursor-pointer"
					onClick={() => setIsPasswordVisible(true)}
				/>
			)}
		</div>
	);
}
