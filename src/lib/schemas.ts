import { z } from 'zod';

export const registerSchema = z
	.object({
		name: z
			.string({ required_error: 'Name is required.' })
			.min(1, { message: 'Name is required.' })
			.max(32, { message: 'Name must be 32 characters or less.' })
			.trim(),
		password: z
			.string({ required_error: 'Password is required.' })
			.min(8, { message: 'Password must be 8 characters or more.' })
			.max(72, { message: 'Password must be 72 characters or less.' })
			.trim(),
		password_confirmation: z
			.string({ required_error: 'Password is required.' })
			.min(8, { message: 'Password must be 8 characters or more.' })
			.max(72, { message: 'Password must be 72 characters or less.' })
			.trim(),
	})
	.superRefine(({ password, password_confirmation }, ctx) => {
		if (password !== password_confirmation) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Passwords do not match.',
				path: ['password_confirmation'],
			});
		}
	});

export const loginSchema = z.object({
	name: z
		.string({ required_error: 'Name is required.' })
		.min(1, { message: 'Name is required.' })
		.max(32, { message: 'Name must be 32 characters or less.' })
		.trim(),
	password: z
		.string({ required_error: 'Password is required.' })
		.min(8, { message: 'Password must be 8 characters or more.' })
		.max(72, { message: 'Password must be 72 characters or less.' })
		.trim(),
});

export const emailUpdateSchema = z.object({
	email: z
		.string()
		.email({ message: 'Must be a valid email.' })
		.max(255, { message: 'Name must be 255 characters or less.' })
		.trim()
		.optional(),
});

export const passwordUpdateSchema = z
	.object({
		current_password: z
			.string({ required_error: 'Current password is required.' })
			.min(8, { message: 'Current password must be 8 characters or more.' })
			.max(72, { message: 'Current password must be 72 characters or less.' })
			.trim(),
		password: z
			.string({ required_error: 'A new password is required.' })
			.min(8, { message: 'New password must be 8 characters or more.' })
			.max(72, { message: 'New password must be 72 characters or less.' })
			.trim(),
		password_confirmation: z
			.string({ required_error: 'A new password confirmation is required.' })
			.min(8, { message: 'New password must be 8 characters or more.' })
			.max(72, { message: 'New password must be 72 characters or less.' })
			.trim(),
	})
	.superRefine(({ password, password_confirmation }, ctx) => {
		if (password !== password_confirmation) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Passwords do not match.',
				path: ['password_confirmation'],
			});
		}
	});

const validFilenames = [
	'enblocal.ini',
	'enbseries.ini',
	'fallout.ini',
	'falloutprefs.ini',
	'fallout4.ini',
	'fallout4custom.ini',
	'fallout4prefs.ini',
	'geckcustom.ini',
	'geckprefs.ini',
	'loadorder.txt',
	'mge.ini',
	'modlist.txt',
	'morrowind.ini',
	'mwse-version.ini',
	'oblivion.ini',
	'oblivionprefs.ini',
	'plugins.txt',
	'settings.txt',
	'skyrim.ini',
	'skyrimcustom.ini',
	'skyrimprefs.ini',
	'starfield.ini',
	'starfieldcustom.ini',
	'starfieldprefs.ini',
];

export const uploadSchema = z.object({
	name: z
		.string({ required_error: 'Name is required.' })
		.min(1, { message: 'Name is required.' })
		.max(32, { message: 'Name must be 32 characters or less.' })
		.trim(),
	description: z.string().trim().optional(),
	game: z.number({ required_error: 'A game is required.' }).default('' as unknown as number),
	version: z.string().trim().optional(),
	readme: z.string().trim().optional(),
	website: z.string().trim().optional(),
	discord: z.string().trim().optional(),
	expires: z.string().trim().optional(),
	private: z.boolean().optional(),
	'files[]': z
		.instanceof(File, { message: 'Please upload a file.' })
		.refine((f) => f.size < 512000, 'Max 512 kB upload size.')
		.refine((f) => f.size > 0, 'File must not be empty.')
		.refine((f) => f.name.endsWith('.txt') || f.name.endsWith('.ini'), 'File must be a .txt or .ini file.')
		.refine(
			(f) => validFilenames.includes(f.name.toLowerCase()),
			'File must be one of the following: ' + validFilenames.join(', ')
		)
		.array(),
});

export const editSchema = z.object({
	slug: z.string(),
	name: z
		.string({ required_error: 'Name is required.' })
		.min(1, { message: 'Name is required.' })
		.max(32, { message: 'Name must be 32 characters or less.' })
		.trim(),
	description: z.string().trim().optional().nullable(),
	game: z.number({ required_error: 'A game is required.' }).default('' as unknown as number),
	version: z.string().trim().optional().nullable(),
	readme: z.string().trim().optional().nullable(),
	website: z.string().trim().optional().nullable(),
	discord: z.string().trim().optional().nullable(),
	expires: z.string().trim().optional().nullable(),
	private: z.boolean().optional(),
	'files[]': z
		.instanceof(File, { message: 'Please upload a file.' })
		.refine((f) => f.size < 512000, 'Max 512 kB upload size.')
		.refine((f) => f.size > 0, 'File must not be empty.')
		.refine((f) => f.name.endsWith('.txt') || f.name.endsWith('.ini'), 'File must be a .txt or .ini file.')
		.refine(
			(f) => validFilenames.includes(f.name.toLowerCase()),
			'File must be one of the following: ' + validFilenames.join(', ')
		)
		.optional()
		.nullable()
		.array(),
});

export type RegisterSchema = typeof registerSchema;
export type LoginSchema = typeof loginSchema;
export type EmailUpdateSchema = typeof emailUpdateSchema;
export type PasswordUpdateSchema = typeof passwordUpdateSchema;
export type UploadSchema = typeof uploadSchema;
export type EditSchema = typeof editSchema;
