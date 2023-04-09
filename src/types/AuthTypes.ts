import {
	ButtonHTMLAttributes,
	DetailedHTMLProps,
	MouseEventHandler,
} from 'react';

export type Auth = {
	user: {
		name: string;
		email?: string;
		admin: boolean;
		verified: boolean;
		created: string;
		updated: string;
	};
	login: Function;
	register: Function;
	logout: React.MouseEventHandler<HTMLButtonElement>;
	errors: {
		name: Array<string>;
		password: Array<string>;
		password_confirmation: Array<string>;
	};
};
