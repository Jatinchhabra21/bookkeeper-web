export type CreateUserRequest = {
	displayName: string;
	email: string;
	password: string;
	otp: string;
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
	  }
	| {
			email: string;
			newPassword: string;
			oldPassword: string;
	  };

export type OtpRequest = {
	email: string;
};

export type ErrorResponseType = {
	errorMessage: string;
	statusCode: number;
};

export type LoginRequestType = {
	email: string;
	password: string;
};

export type LoginResponseType = {
	accessToken: string;
	expiresAt: Date;
	tokenId: string;
	email: string;
	name: string;
};
