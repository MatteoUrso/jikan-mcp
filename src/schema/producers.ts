import { z } from "zod";

export const producersQueryOrderby = z
  .enum(["mal_id", "count", "favorites", "established"])
  .optional()
  .describe(
    `Available Anime order_by properties:
        - mal_id: MyAnimeList ID
        - count: Producers's anime count
        - favorites: Producers's member favorites count
        - established: Established Date ISO8601`
  );
export type ProducersQueryOrderby = z.infer<typeof producersQueryOrderby>;
