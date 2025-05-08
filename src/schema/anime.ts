import { z } from "zod";

export const animeSearchQueryType = z
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
  );
export type AnimeSearchQueryType = z.infer<typeof animeSearchQueryType>;

export const animeSearchQueryStatus = z
  .enum(["airing", "complete", "upcoming"])
  .optional()
  .describe(
    `Available Anime statuses:
        - airing: Currently airing
        - complete: Completed
        - upcoming: Upcoming`
  );
export type AnimeSearchQueryStatus = z.infer<typeof animeSearchQueryStatus>;

export const animeSearchQueryRating = z
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
  );
export type AnimeSearchQueryRating = z.infer<typeof animeSearchQueryRating>;

export const animeSearchQueryOrderby = z
  .enum([
    "mal_id",
    "title",
    "start_date",
    "end_date",
    "episodes",
    "score",
    "scored_by",
    "rank",
    "popularity",
    "members",
    "favorites",
  ])
  .optional()
  .describe(
    `Available Anime order_by properties:
        - mal_id: MyAnimeList ID
        - title: Title
        - start_date: Start Date
        - end_date: End Date
        - episodes: Number of Episodes
        - score: Score
        - scored_by: Number of people who scored the anime
        - rank: Rank
        - popularity: Popularity
        - members: Number of members
        - favorites: Number of favorites`
  );
export type AnimeSearchQueryOrderby = z.infer<typeof animeSearchQueryOrderby>;
