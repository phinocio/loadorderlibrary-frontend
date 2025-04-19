export type LoginCredentials = {
	name: string;
	password: string;
};

export type RegisterCredentials = {
	name: string;
	password: string;
	password_confirmation: string;
};

export type CurrentUser = {
	name: string;
	email: string | null;
	verified: boolean;
	admin: boolean;
	profile?: UserProfile | null;
	created: string;
	updated: string;
};
