import type { ListUploadStore } from "@/types/list";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useListUploadStore = create<ListUploadStore>()(
	persist(
		(set) => ({
			formData: {
				name: "",
				version: "",
				description: "",
				website: "",
				discord: "",
				readme: "",
				private: false,
				expires: "",
				game: "",
			},
			step: 1,
			actions: {
				setFormData: (data) =>
					set((state) => ({
						formData: { ...state.formData, ...data },
					})),
				setStep: (step) => set({ step }),
				reset: () =>
					set({
						formData: {
							name: "",
							version: "",
							description: "",
							website: "",
							discord: "",
							readme: "",
							private: false,
							expires: "",
							game: "",
						},
						step: 1,
					}),
			},
		}),
		{
			name: "list-upload-store",
			partialize: (state) => ({
				formData: state.formData,
				step: state.step,
			}),
		},
	),
);

export const useListUploadFormData = () =>
	useListUploadStore((state) => state.formData);
export const useListUploadStep = () =>
	useListUploadStore((state) => state.step);
export const useListUploadActions = () =>
	useListUploadStore((state) => state.actions);
