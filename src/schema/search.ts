import { z } from "zod";

export const searchQuerySort = z
  .enum(["desc", "asc"])
  .optional()
  .describe("Search query sort direction");
export type SearchQuerySort = z.infer<typeof searchQuerySort>;
