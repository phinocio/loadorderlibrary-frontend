import type { List, ListEditStore } from "@/types/list";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useListEditStore = create<ListEditStore>()(
	persist(
		(set) => ({
			originalList: null,
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
				setOriginalList: (list: List) =>
					set({
						originalList: list,
						formData: {
							name: list.name || "",
							version: list.version || "",
							description: list.description || "",
							website: list.website || "",
							discord: list.discord || "",
							readme: list.readme || "",
							private: list.private || false,
							expires: list.expires
								? new Date(list.expires) > new Date()
									? "never" // If it has a valid expiry date, show "never" for simplicity
									: "never"
								: "never",
							game: String(list.game.id),
						},
					}),
				setFormData: (data) =>
					set((state) => ({
						formData: { ...state.formData, ...data },
					})),
				setStep: (step) => set({ step }),
				reset: () =>
					set({
						originalList: null,
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
			name: "list-edit-store",
			partialize: (state) => ({
				originalList: state.originalList,
				formData: state.formData,
				step: state.step,
			}),
		},
	),
);

export const useListEditOriginalList = () =>
	useListEditStore((state) => state.originalList);
export const useListEditFormData = () =>
	useListEditStore((state) => state.formData);
export const useListEditStep = () => useListEditStore((state) => state.step);
export const useListEditActions = () =>
	useListEditStore((state) => state.actions);

// Derived state
export const editStep1Completed = () =>
	useListEditStore((state) => {
		const { name, game } = state.formData;
		return !!name && !!game;
	});

// These steps are always completed because they are optional
export const editStep2Completed = () =>
	useListEditStore((state) => state.step > 2);
export const editStep3Completed = () =>
	useListEditStore((state) => state.step > 3);
export const editStep4Completed = () =>
	useListEditStore((state) => state.step > 4);
