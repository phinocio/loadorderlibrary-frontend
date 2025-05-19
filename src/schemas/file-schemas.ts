import { z } from "zod";

export const FileSchema = z.object({
	name: z.string(),
	clean_name: z.string(),
	size_in_bytes: z.number(),
	content: z.array(z.string()).optional(),
});

export const FileUploadSchema = z.object({
	files: z.array(
		z
			.instanceof(File)
			.refine(
				(file) => {
					return file.size > 0;
				},
				{
					message: "File size must be greater than 0",
				},
			)
			.refine(
				(file) => {
					return file.size <= 512 * 1024; // 512KB
				},
				{
					message: "File size must be less than or equal to 512KB",
				},
			)
			.refine(
				(file) => {
					[
						"text/plain",
						"application/x-wine-extension-ini",
						"application/octet-stream",
					].includes(file.type);
				},
				{
					message: "Invalid file type - must be .ini or .txt",
				},
			),
	),
});
