import type { FileSchema } from "@/schemas/file-schemas";
import type { z } from "zod";

export const File = z.infer<typeof FileSchema>;
