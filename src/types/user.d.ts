export type User = {
	name: string;
	verified: boolean;
	profile?: UserProfile | null;
	created: string;
	updated: string;
	links: {
		self: string;
		url: string;
	};
};

export type UserUpdateParams = Partial<{
	email: string | null;
}>;

export type UserPasswordUpdateParams = {
	current_password: string;
	password: string;
	password_confirmation: string;
};

export type UserProfile = {
	bio: string;
	discord: string;
	kofi: string;
	patreon: string;
	website: string;
};
