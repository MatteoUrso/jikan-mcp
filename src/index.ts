import { setServerInstance } from "./logger.js";
import getAnimeFullById, {
  argSchema as getAnimeFullByIdSchema,
} from "./tools/getAnimeFullById.js";
import getAnimeSearch, {
  argSchema as getAnimeSearchSchema,
} from "./tools/getAnimeSearch.js";
import getProducers, {
  argSchema as getProducersSchema,
} from "./tools/getProducers.js";
import getTopAnime, {
  argSchema as getTopAnimeSchema,
} from "./tools/getTopAnime.js";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

// Create the server with logging capability enabled
const server = new McpServer(
  {
    name: "jikan-mcp",
    version: "1.0.0",
    // description: "Jikan API Model Context Protocol Server",
  },
  {
    capabilities: {
      logging: {},
      tools: {},
    },
  }
);

// Set the server instance for logging
setServerInstance(server);

// TOP
server.tool("get_top_anime", "Get Top Anime", getTopAnimeSchema, getTopAnime);

// ANIME
server.tool(
  "get_anime_full_by_id",
  "Get Anime Full By ID",
  getAnimeFullByIdSchema,
  getAnimeFullById
);
server.tool(
  "get_anime_search",
  "Get Anime Search",
  getAnimeSearchSchema,
  getAnimeSearch
);

// PRODUCERS
server.tool("get_producers", "Get Producers", getProducersSchema, getProducers);

// Set up the transport
const transport = new StdioServerTransport();
await server.connect(transport);
