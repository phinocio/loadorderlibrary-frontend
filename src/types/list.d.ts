import type {
	ListCreateParamsSchema,
	ListSchema,
	ListUpdateParamsSchema,
} from "@/schemas/list-schemas";
import type { z } from "zod";

export type List = z.infer<typeof ListSchema>;
export type ListCreateParams = z.infer<typeof ListCreateParamsSchema>;
export type ListUpdateParams = z.infer<typeof ListUpdateParamsSchema>;

export type ListUploadStore = {
	formData: ListCreateParams;
	step: number;
	actions: {
		setFormData: (data: Partial<ListCreateParams>) => void;
		setStep: (step: number) => void;
		reset: () => void;
	};
};

export type ListEditStore = {
	originalList: List | null;
	formData: ListUpdateParams;
	step: number;
	actions: {
		setOriginalList: (list: List) => void;
		setFormData: (data: Partial<ListUpdateParams>) => void;
		setStep: (step: number) => void;
		reset: () => void;
	};
};
