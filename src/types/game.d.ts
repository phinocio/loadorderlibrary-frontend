import type { z } from "zod";
import type { GameSchema } from "@/schemas/game-schemas";

export type Game = z.infer<typeof GameSchema>;
