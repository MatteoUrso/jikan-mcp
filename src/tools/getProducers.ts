import { JIKAN_API_BASE } from "../constants.js";
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

export default async function getProducers({
  page,
  limit,
  q,
  order_by,
  sort,
  letter,
}: {
  page: number;
  limit: number;
  q?: string;
  order_by?: ProducersQueryOrderby;
  sort?: SearchQuerySort;
  letter?: string;
}): Promise<CallToolResult> {
  const url = new URL("producers", JIKAN_API_BASE);
  url.searchParams.append("page", page.toString());
  url.searchParams.append("limit", limit.toString());

  if (q) {
    url.searchParams.append("q", q);
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
