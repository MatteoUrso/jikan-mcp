import { getProducers as getProducersFromJikan } from "../lib/jikan.js";
import {
  ProducersQueryOrderby,
  producersQueryOrderby,
} from "../schema/producers.js";
import { SearchQuerySort, searchQuerySort } from "../schema/search.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";

export const argSchema = {
  page: z.number().default(1).describe("Page number for pagination"),
  limit: z.number().default(25).describe("Number of results per page"),
  q: z.string().optional().describe("Search query"),
  order_by: producersQueryOrderby,
  sort: searchQuerySort,
  letter: z
    .string()
    .optional()
    .describe("Return entries starting with the given letter"),
};

export default async function getProducers(args: {
  page: number;
  limit: number;
  q?: string;
  order_by?: ProducersQueryOrderby;
  sort?: SearchQuerySort;
  letter?: string;
}): Promise<CallToolResult> {
  const data = await getProducersFromJikan(args);

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(data),
      },
    ],
  };
}
