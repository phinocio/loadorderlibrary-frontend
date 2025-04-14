export type User = {
	name: string;
	email: string | null;
	verified: boolean;
	admin: boolean;
	profile?: UserProfile | null;
	created: string;
	updated: string;
	links: {
		self: string;
		url: string;
	};
};

export type UserProfile = {
	bio: string;
	discord: string;
	kofi: string;
	patreon: string;
	website: string;
};
