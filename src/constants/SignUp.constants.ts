export enum SignUpStage {
	USER_DETAIL,
	OTP,
}

export default Object.freeze({
	EMAIL_REQUIRED: 'Email address is required',
	EMAIL_INVALID: 'Invalid email',
	NAME_REQUIRED: 'Name is required',
	DIALOG_TITLE: 'Sign up',
	NAME_INPUT_PLACEHOLDER: 'Full name',
	EMAIL_INPUT_PLACEHOLDER: 'Email',
	CTA_TEXT: 'Request OTP',
	PASSWORD_REQUIRED: 'Password is required',
	REPEAT_PASSWORD_REQUIRED: 'Please confirm your password',
	PASSWORD_NO_MATCH: 'Password does not match',
	PASSWORD_MIN_LENGTH: 'Password length is less than 8 characters',
	PASSWORD_MAX_LENGTH: 'Password length is more than 16 characters',
	PASSWORD_DIGIT_RULE: 'Password should contain at least one digit',
	PASSWORD_UPPERCASE_RULE:
		'Password should contain at least one uppercase character',
	PASSWORD_SPECIAL_CHAR_RULE:
		'Password should contain at least one special character',
	PASSWORD_INVALID: 'Invalid password',
	PASSWORD_INPUT_PLACEHOLDER: 'Password',
	REPEAT_PASSWORD_INPUT_PLACEHOLDER: 'Re-enter your password',
});
