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
	// Form data
	formData: Partial<ListUploadFormData>;
	// Current step
	step: number;
	// Actions
	actions: {
		setFormData: (data: Partial<ListUploadFormData>) => void;
		setStep: (step: number) => void;
		reset: () => void;
	};
};
