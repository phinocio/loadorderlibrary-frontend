export type UploadErrors = {
	name: string;
	description: string;
	game: number;
	version?: string;
	website?: string;
	discord?: string;
	readme?: string;
	files: string;
	expires?: string;
};
