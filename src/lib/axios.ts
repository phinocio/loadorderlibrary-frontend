import axios, { type InternalAxiosRequestConfig } from "axios";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const apiVersion = import.meta.env.VITE_API_VERSION;
const csrfEndpoint = `${apiBaseUrl}/sanctum/csrf-cookie`;

const axiosInstance = axios.create({
	baseURL: `${apiBaseUrl}/${apiVersion}`,
	withCredentials: true,
	withXSRFToken: true,
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
	},
});

// Utility: List of HTTP methods that require CSRF
const csrfMethods = ["post", "put", "patch", "delete"];

axiosInstance.interceptors.request.use(
	async (config: InternalAxiosRequestConfig) => {
		const method = config.method?.toLowerCase();

		if (method && csrfMethods.includes(method)) {
			await axios.get(csrfEndpoint, {
				withCredentials: true,
			});
		}

		return config;
	},
);

export default axiosInstance;
