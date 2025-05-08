import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { JIKAN_API_BASE } from "../constants.js";

export const argSchema = {
  type: z
    .enum([
      "tv",
      "movie",
      "ova",
      "special",
      "ona",
      "music",
      "cm",
      "pv",
      "tv_special",
    ])
    .optional()
    .describe(
      `Available Anime types:
        - tv: TV Series
        - movie: Movie
        - ova: Original Video Animation
        - special: Special
        - ona: Original Net Animation
        - music: Music
        - cm: Commercial
        - pv: Promotional Video
        - tv_special: TV Special`
    ),
  rating: z
    .enum(["g", "pg", "pg13", "r17", "r", "rx"])
    .optional()
    .describe(
      `Available Anime audience ratings:
        - g: G - All Ages
        - pg: PG - Children
        - pg13: PG-13 - Teens 13 or older
        - r17: R - 17+ (violence & profanity)
        - r: R+ - Mild Nudity
        - rx: Rx - Hentai`
    ),
  sfw: z.boolean().optional().describe("Safe For Work filter"),
  page: z.number().default(1).describe("Page number for pagination"),
  limit: z.number().default(25).describe("Number of results per page"),
};

export default async function getTopAnime({
  page,
  limit,
  type,
  rating,
  sfw,
}: {
  page: number;
  limit: number;
  type?:
    | "tv"
    | "movie"
    | "ova"
    | "special"
    | "ona"
    | "music"
    | "cm"
    | "pv"
    | "tv_special"
    | undefined;
  rating?: "g" | "pg" | "pg13" | "r17" | "r" | "rx" | undefined;
  sfw?: boolean | undefined;
}): Promise<CallToolResult> {
  const url = new URL("top/anime", JIKAN_API_BASE);
  url.searchParams.append("page", page.toString());
  url.searchParams.append("limit", limit.toString());

  if (type) {
    url.searchParams.append("type", type);
  }
  if (rating) {
    url.searchParams.append("rating", rating);
  }
  if (sfw) {
    url.searchParams.append("sfw", sfw.toString());
  }

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
