import { getAnimeSearch as getAnimeSearchFromJikan } from "../lib/jikan.js";
import {
  AnimeSearchQueryOrderby,
  AnimeSearchQueryRating,
  AnimeSearchQueryStatus,
  AnimeSearchQueryType,
  animeSearchQueryOrderby,
  animeSearchQueryRating,
  animeSearchQueryStatus,
  animeSearchQueryType,
} from "../schema/anime.js";
import { SearchQuerySort, searchQuerySort } from "../schema/search.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";

export const argSchema = {
  page: z.number().default(1).describe("Page number for pagination"),
  limit: z.number().default(25).describe("Number of results per page"),
  q: z.string().optional().describe("Search query"),
  type: animeSearchQueryType,
  score: z.number().optional().describe("Set a score for results."),
  min_score: z.number().optional().describe("Set a minimum score for results."),
  max_score: z.number().optional().describe("Set a maximum score for results."),
  status: animeSearchQueryStatus,
  rating: animeSearchQueryRating,
  sfw: z.boolean().optional().describe("Safe For Work filter"),
  genres: z
    .string()
    .optional()
    .describe(
      "Filter by genre(s) IDs. Can pass multiple with a comma as a delimiter. e.g 1,2,3"
    ),
  genres_exclude: z
    .string()
    .optional()
    .describe(
      "Exclude genre(s) IDs. Can pass multiple with a comma as a delimiter. e.g 1,2,3"
    ),
  order_by: animeSearchQueryOrderby,
  sort: searchQuerySort,
  letter: z
    .string()
    .optional()
    .describe("Return entries starting with the given letter"),
  producers: z
    .string()
    .optional()
    .describe(
      "Filter by producer(s) IDs. Can pass multiple with a comma as a delimiter. e.g 1,2,3"
    ),
};

export default async function getAnimeSearch(args: {
  page: number;
  limit: number;
  q?: string;
  type?: AnimeSearchQueryType;
  score?: number;
  min_score?: number;
  max_score?: number;
  status?: AnimeSearchQueryStatus;
  rating?: AnimeSearchQueryRating;
  sfw?: boolean;
  genres?: string;
  genres_exclude?: string;
  order_by?: AnimeSearchQueryOrderby;
  sort?: SearchQuerySort;
  letter?: string;
  producers?: string;
}): Promise<CallToolResult> {
  const data = await getAnimeSearchFromJikan(args);

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(data),
      },
    ],
  };
}
