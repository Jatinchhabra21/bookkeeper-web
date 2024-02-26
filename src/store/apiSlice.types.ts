export type CreateUserRequest = {
	displayName: string;
	email: string;
	password: string;
	otp: number;
	userPreference: UserPreference;
};

export type UserPreference = {
	defaultCurrency: string;
	defaultTheme: 'Default' | 'Light' | 'Dark';
	dailyReminder: boolean;
};

export type ResetPasswordRequest =
	| {
			email: string;
			otp: number;
			newPassword: string;
			oldPassword: undefined;
	  }
	| {
			email: string;
			otp: undefined;
			newPassword: string;
			oldPassword: string;
	  };

export type OtpRequest = {
	email: string;
};
