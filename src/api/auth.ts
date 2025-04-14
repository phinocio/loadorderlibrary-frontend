import axios from "@/lib/axios";
import type { User } from "@/types/user";

export const login = (data: { name: string; password: string }) =>
	handleResponse<User>(axios.post("/login", data));

export const register = (data: {
	name: string;
	password: string;
	password_confirmation: string;
}) => handleResponse<User>(axios.post("/register", data));

export const logout = () => handleResponse<void>(axios.post("/logout"));

export const getUser = () => handleResponse<User>(axios.get("/me"));
