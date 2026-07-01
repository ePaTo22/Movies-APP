import { NextResponse } from "next/server";
import { normalizeTmdbMovie, searchCuratedMovies } from "@/lib/movies";

const tmdbBaseUrl = "https://api.themoviedb.org/3";

async function fetchTmdb(path: string) {
  const bearer = process.env.TMDB_BEARER_TOKEN;
  const apiKey = process.env.TMDB_API_KEY;
  const separator = path.includes("?") ? "&" : "?";
  const url = apiKey ? `${tmdbBaseUrl}${path}${separator}api_key=${apiKey}` : `${tmdbBaseUrl}${path}`;

  if (!bearer && !apiKey) {
    return null;
  }

  const response = await fetch(url, {
    headers: bearer ? { Authorization: `Bearer ${bearer}` } : undefined,
    next: { revalidate: 60 * 30 },
  });

  if (!response.ok) {
    return null;
  }

  return response.json() as Promise<{ results?: unknown[] }>;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query") ?? "";
  const mood = searchParams.get("mood") ?? "all";
  const hasQuery = query.trim().length > 0;

  const path = hasQuery
    ? `/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1`
    : "/trending/movie/week?language=en-US";

  const tmdbData = await fetchTmdb(path);
  const tmdbMovies =
    tmdbData?.results
      ?.map((movie) => normalizeTmdbMovie(movie as Parameters<typeof normalizeTmdbMovie>[0]))
      .filter((movie): movie is NonNullable<typeof movie> => Boolean(movie)) ?? [];

  const movies = tmdbMovies.length > 0 ? tmdbMovies.slice(0, 12) : searchCuratedMovies(query, mood);
  const source = tmdbMovies.length > 0 ? "tmdb" : "curated";

  return NextResponse.json({
    source,
    movies: source === "tmdb" && mood !== "all" ? movies.filter((movie) => movie.mood === mood) : movies,
  });
}
