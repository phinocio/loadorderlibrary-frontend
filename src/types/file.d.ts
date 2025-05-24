import type { FileSchema } from "@/schemas/file-schemas";
import type { z } from "zod";

export type File = z.infer<typeof FileSchema>;
export type Files = File[];
