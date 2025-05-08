import { JIKAN_API_BASE } from "../constants.js";
import { logger } from "../logger.js";
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

export default async function getAnimeSearch({
  page,
  limit,
  q,
  type,
  score,
  min_score,
  max_score,
  status,
  rating,
  sfw,
  genres,
  genres_exclude,
  order_by,
  sort,
  letter,
  producers,
}: {
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
  const url = new URL(`anime`, JIKAN_API_BASE);
  url.searchParams.append("page", page.toString());
  url.searchParams.append("limit", limit.toString());

  if (q) {
    url.searchParams.append("q", q);
  }

  if (type) {
    url.searchParams.append("type", type);
  }

  if (score) {
    url.searchParams.append("score", score.toString());
  }

  if (min_score) {
    url.searchParams.append("min_score", min_score.toString());
  }

  if (max_score) {
    url.searchParams.append("max_score", max_score.toString());
  }

  if (status) {
    url.searchParams.append("status", status);
  }

  if (rating) {
    url.searchParams.append("rating", rating);
  }

  if (sfw) {
    url.searchParams.append("sfw", sfw.toString());
  }

  if (genres) {
    url.searchParams.append("genres", genres);
  }

  if (genres_exclude) {
    url.searchParams.append("genres_exclude", genres_exclude);
  }

  if (order_by) {
    url.searchParams.append("order_by", order_by);
  }

  if (sort) {
    url.searchParams.append("sort", sort);
  }

  if (letter) {
    url.searchParams.append("letter", letter);
  }

  if (producers) {
    url.searchParams.append("producers", producers);
  }

  logger.debug("Fetching data from Jikan API", {
    url: url.toString(),
    params: {
      page,
      limit,
      q,
      type,
      score,
      min_score,
      max_score,
      status,
      rating,
      sfw,
      genres,
      genres_exclude,
      order_by,
      sort,
      letter,
      producers,
    },
  });

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Error fetching data: ${response.statusText}`);
  }

  const data = await response.json();

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(data),
      },
    ],
  };
}
