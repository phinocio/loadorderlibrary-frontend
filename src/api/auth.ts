import axios from "@/lib/axios";
import type { User } from "@/types/user";

type ApiResponse<T> = {
	data: T;
};

export const register = (data: {
	name: string;
	password: string;
	password_confirmation: string;
}) => axios.post<ApiResponse<User>>("/register", data);

export const login = (data: { name: string; password: string }) =>
	axios.post<ApiResponse<User>>("/login", data);

export const logout = () => axios.post<void>("/logout");

export const getUser = () => axios.get<ApiResponse<User>>("/me");
