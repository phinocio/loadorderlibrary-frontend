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

export type RegisterSchema = typeof registerSchema;
export type LoginSchema = typeof loginSchema;
export type EmailUpdateSchema = typeof emailUpdateSchema;
export type PasswordUpdateSchema = typeof passwordUpdateSchema;
