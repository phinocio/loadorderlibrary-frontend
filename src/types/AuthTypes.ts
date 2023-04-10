type LoginErrors = {
	name: Array<string>;
	password: Array<string>;
};

export type LoginProps = {
	name: string;
	password: string;
	setErrors: React.Dispatch<React.SetStateAction<LoginErrors>>;
};

type RegisterErrors = {
	name: Array<string>;
	password: Array<string>;
	password_confirmation: Array<string>;
};

export type RegisterProps = {
	name: string;
	password: string;
	password_confirmation: string;
	setErrors: React.Dispatch<React.SetStateAction<RegisterErrors>>;
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
	login: ({ name, password }: LoginProps) => Promise<void>;
	register: ({
		name,
		password,
		password_confirmation,
	}: RegisterProps) => Promise<void>;
	logout: React.MouseEventHandler<HTMLButtonElement>;
	isLoading: boolean;
	errors: {
		name: Array<string>;
		password: Array<string>;
		password_confirmation: Array<string>;
	};
};
