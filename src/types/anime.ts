import { AnimeImages } from "./anime_images.js";
import { Broadcast } from "./broadcast.js";
import { Daterange } from "./daterange.js";
import { MALUrl } from "./mal_url.js";
import { Title } from "./title.js";
import { TrailerBase } from "./trailer_base.js";

export type Anime = {
  mal_id: number;
  url: string;
  images: AnimeImages;
  trailer: TrailerBase;
  titles: Title[];
  type: "TV" | "OVA" | "Movie" | "Special" | "ONA" | "Music" | null;
  /**
   * @description Original Material/Source adapted from
   */
  source: string | null;
  episodes: number | null;
  status: "Finished Airing" | "Currently Airing" | "Not yet aired" | null;
  airing: boolean;
  aired: Daterange;
  /**
   * @description Parsed raw duration
   */
  duration: string | null;
  rating:
    | "G - All Ages"
    | "PG - Children"
    | "PG-13 - Teens 13 or older"
    | "R - 17+ (violence & profanity)"
    | "R+ - Mild Nudity"
    | "Rx - Hentai";
  score: number | null;
  scored_by: number | null;
  rank: number | null;
  popularity: number | null;
  members: number | null;
  favorites: number | null;
  synopsis: string | null;
  background: string | null;
  season: "winter" | "spring" | "summer" | "fall" | null;
  year: number | null;
  broadcast: Broadcast;
  producers: MALUrl[];
  licensors: MALUrl[];
  studios: MALUrl[];
  genres: MALUrl[];
  explicit_genres: MALUrl[];
  themes: MALUrl[];
  demographics: MALUrl[];
};
