import type { z } from "zod";
import type { AdminGameCreateSchema } from "@/schemas/admin/game-schemas";

export type AdminGameCreateParams = z.infer<typeof AdminGameCreateSchema>;
