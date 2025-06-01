import type { GameSchema } from "@/schemas/game-schemas";
import type { z } from "zod";

export type Game = z.infer<typeof GameSchema>;
