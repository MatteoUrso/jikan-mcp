import {
  AnimeSearchQueryOrderby,
  AnimeSearchQueryRating,
  AnimeSearchQueryStatus,
  AnimeSearchQueryType,
} from "../schema/anime.js";
import { ProducersQueryOrderby } from "../schema/producers.js";
import { SearchQuerySort } from "../schema/search.js";
import { Anime } from "../types/anime.js";
import { AnimeFull } from "../types/anime_full.js";
import { Pagination } from "../types/pagination.js";
import { Producer } from "../types/producer.js";

const BASE_API_URL = "https://api.jikan.moe/v4";

export async function getAnimeFullById(
  id: number
): Promise<{ data: AnimeFull }> {
  const url = new URL(`${BASE_API_URL}/anime/${id}/full`);
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

  return data;
}

type GetAnimeSearchParams = {
  page?: number;
  limit?: number;
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
};
export async function getAnimeSearch(params?: GetAnimeSearchParams): Promise<{
  data: Anime[];
  pagination: Pagination;
}> {
  const url = new URL(`${BASE_API_URL}/anime`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.append(key, value.toString());
      }
    });
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

  return data;
}

type GetProducersParams = {
  page?: number;
  limit?: number;
  q?: string;
  order_by?: ProducersQueryOrderby;
  sort?: SearchQuerySort;
  letter?: string;
};
export async function getProducers(params?: GetProducersParams): Promise<{
  data: Producer[];
  pagination: Pagination;
}> {
  const url = new URL(`${BASE_API_URL}/producers`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.append(key, value.toString());
      }
    });
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

  return data;
}

type GetTopAnimeParams = {
  page?: number;
  limit?: number;
  type?: AnimeSearchQueryType;
  rating?: AnimeSearchQueryRating;
  sfw?: boolean;
};
export async function getTopAnime(params?: GetTopAnimeParams): Promise<{
  data: AnimeFull[];
  pagination: Pagination;
}> {
  const url = new URL(`${BASE_API_URL}/top/anime`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.append(key, value.toString());
      }
    });
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

  return data;
}
