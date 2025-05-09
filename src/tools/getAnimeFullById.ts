import { getAnimeFullById as getAnimeFullByIdFromJikan } from "../lib/jikan.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";

export const argSchema = {
  id: z.number().describe("Anime ID"),
};

export default async function getAnimeFullById({
  id,
}: {
  id: number;
}): Promise<CallToolResult> {
  const { data: anime } = await getAnimeFullByIdFromJikan(id);

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(anime),
      },
    ],
  };
}
