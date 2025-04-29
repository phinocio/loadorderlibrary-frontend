import type { AdminGameUpdateSchema } from "@/schemas/admin/game-schemas";
import type { z } from "zod";

export type AdminGameUpdateParams = z.infer<typeof AdminGameUpdateSchema>;
