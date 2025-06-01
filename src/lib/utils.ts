import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

/**
 * Ensures a URL has a proper protocol (http/https)
 * If the URL already starts with http:// or https://, returns it as-is
 * Otherwise, prepends https:// to the URL
 */
export function ensureHttpProtocol(url: string): string {
	if (!url) return url;

	// Check if URL already has a protocol
	if (url.startsWith("http://") || url.startsWith("https://")) {
		return url;
	}

	// Add https:// as default protocol
	return `https://${url}`;
}
