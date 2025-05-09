import { getTopAnime as getTopAnimeFromJikan } from "../lib/jikan.js";
import {
  AnimeSearchQueryRating,
  AnimeSearchQueryType,
  animeSearchQueryRating,
  animeSearchQueryType,
} from "../schema/anime.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";

export const argSchema = {
  type: animeSearchQueryType,
  rating: animeSearchQueryRating,
  sfw: z.boolean().optional().describe("Safe For Work filter"),
  page: z.number().default(1).describe("Page number for pagination"),
  limit: z.number().default(25).describe("Number of results per page"),
};

export default async function getTopAnime(args: {
  page: number;
  limit: number;
  type?: AnimeSearchQueryType;
  rating?: AnimeSearchQueryRating;
  sfw?: boolean;
}): Promise<CallToolResult> {
  const data = await getTopAnimeFromJikan(args);

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(data),
      },
    ],
  };
}
