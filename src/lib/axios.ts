import { useQueryClient } from "@tanstack/react-query";
import { redirect } from "@tanstack/react-router";
import axios, { type InternalAxiosRequestConfig } from "axios";

export function useAxios() {
	const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
	const apiVersion = import.meta.env.VITE_API_VERSION;
	const csrfEndpoint = `${apiBaseUrl}/sanctum/csrf-cookie`;

	const queryClient = useQueryClient();

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

	axiosInstance.interceptors.response.use(
		(response) => response,
		(error) => {
			if (error.response?.status === 401) {
				queryClient.setQueryData(["current-user"], null);

				const currentPath = window.location.pathname;
				throw redirect({
					to: "/login",
					search: {
						redirect: currentPath,
					},
				});
			}
			return Promise.reject(error);
		},
	);

	return axiosInstance;
}
