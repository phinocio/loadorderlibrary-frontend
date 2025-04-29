import type { AdminGameCreateSchema } from "@/schemas/admin/game-schemas";
import type { z } from "zod";

export type AdminGameCreateParams = z.infer<typeof AdminGameCreateSchema>;
