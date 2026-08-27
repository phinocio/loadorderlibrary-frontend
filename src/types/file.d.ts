import type { z } from "zod";
import type { FileSchema } from "@/schemas/file-schemas";

export type File = z.infer<typeof FileSchema>;
export type Files = File[];
