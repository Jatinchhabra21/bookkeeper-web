import {
	CreateUserRequest,
	LoginRequestType,
	LoginResponseType,
} from '../store/apiSlice.types';
import { useContext, useState } from 'react';
import { useToast } from '../../components/ui/use-toast';
import { createContext } from 'react';
import { useNavigate } from 'react-router-dom';

export const authContext = createContext<any>(null);

const baseUrl: string = 'https://bookkeeper.azurewebsites.net/api';

const useAuth = () => {
	const auth = useContext(authContext);
	return auth;
};

export type AuthenticatedUserType = {
	email: string;
	name: string | undefined;
	accessToken: string;
	expiresAt: Date;
	tokenId: string;
};

export function AuthProvider({ children }: any) {
	const [authenticatedUser, setAuthenticatedUser] =
		useState<AuthenticatedUserType | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const navigate = useNavigate();

	const { toast } = useToast();

	const logIn = ({ email, password }: LoginRequestType) => {
		setIsLoading(true);
		fetch(`${baseUrl}/oauth2/token`, {
			body: JSON.stringify({ email, password }),
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then(async (response: Response) => {
				const data = await response.json();
				if (response.ok) return data;
				else throw data;
			})
			.then((data: LoginResponseType) => {
				setAuthenticatedUser({
					email: email,
					accessToken: data.accessToken,
					expiresAt: data.expiresAt,
					tokenId: data.tokenId,
					name: undefined,
				});
			})
			.catch((error) => {
				toast({
					title: error.errorMessage
						? 'Uh oh! :( ' + error.errorMessage
						: 'Uh oh! Something went wrong.',
				});
			})
			.finally(() => {
				setIsLoading(false);
				navigate('/');
			});
	};

	const signUp = (request: CreateUserRequest) => {
		setIsLoading(true);
		fetch(`${baseUrl}/users/new`, {
			body: JSON.stringify(request),
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then(async (response) => {
				if (response.ok) return await response.json();
				else throw await response.json();
			})
			.then(() => {
				logIn({ email: request.email, password: request.password });
			})
			.catch((error) => {
				toast({
					title: error.errorMessage
						? '🙁 Oops! ' + error.errorMessage
						: '🙁 Oops! Something went wrong.',
					variant: 'error',
				});
			})
			.finally(() => {
				setIsLoading(false);
				navigate('/');
			});
	};

	const signOut = () => {
		setAuthenticatedUser(null);
	};
	return (
		<authContext.Provider
			value={{ authenticatedUser, isLoading, logIn, signUp, signOut }}
		>
			{children}
		</authContext.Provider>
	);
}

export { useAuth };
