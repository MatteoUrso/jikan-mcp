import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { JIKAN_API_BASE } from "../constants.js";

export const argSchema = {
  id: z.number().describe("Anime ID"),
};

export default async function getAnimeFullById({
  id,
}: {
  id: number;
}): Promise<CallToolResult> {
  const url = new URL(`anime/${id}/full`, JIKAN_API_BASE);

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
  const { data: dataAnime } = data;

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(dataAnime),
      },
    ],
  };
}
