export type LoginErrors = {
	name: Array<string>;
	password: Array<string>;
};

export type LoginProps = {
	name: string;
	password: string;
	setErrors: React.Dispatch<React.SetStateAction<LoginErrors | null>>;
};

export type RegisterErrors = {
	name: Array<string>;
	password: Array<string>;
	password_confirmation: Array<string>;
};

export type RegisterProps = {
	name: string;
	password: string;
	password_confirmation: string;
	setErrors: React.Dispatch<React.SetStateAction<RegisterErrors | null>>;
};

export type User = {
	name: string;
	email?: string;
	admin: boolean;
	verified: boolean;
	created: string;
	updated: string;
};

export type Auth = {
	user: User;
	login: ({ name, password, setErrors }: LoginProps) => Promise<void>;
	register: ({
		name,
		password,
		password_confirmation,
		setErrors,
	}: RegisterProps) => Promise<void>;
	logout: React.MouseEventHandler<HTMLButtonElement>;
	isLoading: boolean;
	errors: {
		name: Array<string>;
		password: Array<string>;
		password_confirmation: Array<string>;
	};
};
