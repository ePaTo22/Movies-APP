export type Movie = {
  id: number;
  title: string;
  year: string;
  rating: number;
  runtime: string;
  genres: string[];
  overview: string;
  poster: string;
  backdrop: string;
  mood: "mind-bending" | "epic" | "cozy" | "electric";
  source: "curated" | "tmdb";
};

type TmdbMovie = {
  id: number;
  title?: string;
  name?: string;
  release_date?: string;
  first_air_date?: string;
  vote_average?: number;
  overview?: string;
  poster_path?: string;
  backdrop_path?: string;
  genre_ids?: number[];
};

const imageBase = "https://image.tmdb.org/t/p";

const genreMap = new Map<number, string>([
  [12, "Adventure"],
  [14, "Fantasy"],
  [16, "Animation"],
  [18, "Drama"],
  [27, "Horror"],
  [28, "Action"],
  [35, "Comedy"],
  [53, "Thriller"],
  [80, "Crime"],
  [878, "Sci-Fi"],
  [9648, "Mystery"],
  [10749, "Romance"],
]);

export const curatedMovies: Movie[] = [
  {
    id: 27205,
    title: "Inception",
    year: "2010",
    rating: 8.4,
    runtime: "2h 28m",
    genres: ["Sci-Fi", "Thriller", "Heist"],
    overview:
      "A thief who steals secrets through shared dreams takes one last job: planting an idea inside a target's mind.",
    poster: `${imageBase}/w500/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg`,
    backdrop: `${imageBase}/w1280/s3TBrRGB1iav7gFOCNx3H31MoES.jpg`,
    mood: "mind-bending",
    source: "curated",
  },
  {
    id: 157336,
    title: "Interstellar",
    year: "2014",
    rating: 8.5,
    runtime: "2h 49m",
    genres: ["Adventure", "Drama", "Sci-Fi"],
    overview:
      "A team of explorers travels through a wormhole to find humanity a future beyond a dying Earth.",
    poster: `${imageBase}/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg`,
    backdrop: `${imageBase}/w1280/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg`,
    mood: "epic",
    source: "curated",
  },
  {
    id: 496243,
    title: "Parasite",
    year: "2019",
    rating: 8.5,
    runtime: "2h 12m",
    genres: ["Drama", "Thriller", "Comedy"],
    overview:
      "Two families from opposite ends of Seoul become entangled in a razor-sharp story about class and survival.",
    poster: `${imageBase}/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg`,
    backdrop: `${imageBase}/w1280/TU9NIjwzjoKPwQHoHshkFcQUCG.jpg`,
    mood: "electric",
    source: "curated",
  },
  {
    id: 641,
    title: "Requiem for a Dream",
    year: "2000",
    rating: 8.0,
    runtime: "1h 42m",
    genres: ["Drama", "Psychological"],
    overview:
      "Four connected lives spiral through obsession and addiction in a formally daring psychological drama.",
    poster: `${imageBase}/w500/nOd6vjEmzCT0k4VYqsA2hwyi87C.jpg`,
    backdrop: `${imageBase}/w1280/3LqjBWBPghYA3Qw0n3VYePN9jDa.jpg`,
    mood: "mind-bending",
    source: "curated",
  },
  {
    id: 10681,
    title: "WALL-E",
    year: "2008",
    rating: 8.1,
    runtime: "1h 38m",
    genres: ["Animation", "Adventure", "Romance"],
    overview:
      "A lonely cleanup robot discovers wonder, friendship, and a second chance for Earth among the stars.",
    poster: `${imageBase}/w500/hbhFnRzzg6ZDmm8YAmxBnQpQIPh.jpg`,
    backdrop: `${imageBase}/w1280/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg`,
    mood: "cozy",
    source: "curated",
  },
  {
    id: 299536,
    title: "Avengers: Infinity War",
    year: "2018",
    rating: 8.2,
    runtime: "2h 29m",
    genres: ["Action", "Adventure", "Superhero"],
    overview:
      "Earth's heroes collide with Thanos in a massive battle over fate, sacrifice, and impossible odds.",
    poster: `${imageBase}/w500/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg`,
    backdrop: `${imageBase}/w1280/lmZFxXgJE3vgrciwuDib0N8CfQo.jpg`,
    mood: "epic",
    source: "curated",
  },
  {
    id: 597,
    title: "Titanic",
    year: "1997",
    rating: 7.9,
    runtime: "3h 14m",
    genres: ["Drama", "Romance", "History"],
    overview:
      "A sweeping romance unfolds aboard the doomed ocean liner, where class lines blur against disaster.",
    poster: `${imageBase}/w500/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg`,
    backdrop: `${imageBase}/w1280/rzdPqYx7Um4FUZeD8wpXqjAUcEm.jpg`,
    mood: "cozy",
    source: "curated",
  },
  {
    id: 155,
    title: "The Dark Knight",
    year: "2008",
    rating: 8.5,
    runtime: "2h 32m",
    genres: ["Action", "Crime", "Drama"],
    overview:
      "Batman faces a criminal mastermind who turns Gotham's order, morality, and heroes against themselves.",
    poster: `${imageBase}/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg`,
    backdrop: `${imageBase}/w1280/hkBaDkMWbLaf8B1lsWsKX7Ew3Xq.jpg`,
    mood: "electric",
    source: "curated",
  },
];

export function searchCuratedMovies(query: string, mood = "all") {
  const normalized = query.trim().toLowerCase();

  return curatedMovies.filter((movie) => {
    const matchesMood = mood === "all" || movie.mood === mood;
    const matchesQuery =
      normalized.length === 0 ||
      [movie.title, movie.overview, movie.year, ...movie.genres]
        .join(" ")
        .toLowerCase()
        .includes(normalized);

    return matchesMood && matchesQuery;
  });
}

export function normalizeTmdbMovie(movie: TmdbMovie): Movie | null {
  const title = movie.title ?? movie.name;

  if (!title || !movie.poster_path || !movie.backdrop_path) {
    return null;
  }

  const date = movie.release_date ?? movie.first_air_date ?? "";
  const genres = (movie.genre_ids ?? [])
    .map((genre) => genreMap.get(genre))
    .filter((genre): genre is string => Boolean(genre))
    .slice(0, 3);

  return {
    id: movie.id,
    title,
    year: date ? date.slice(0, 4) : "TBA",
    rating: Number((movie.vote_average ?? 0).toFixed(1)),
    runtime: "Feature",
    genres: genres.length > 0 ? genres : ["Cinema"],
    overview: movie.overview || "No synopsis available yet.",
    poster: `${imageBase}/w500${movie.poster_path}`,
    backdrop: `${imageBase}/w1280${movie.backdrop_path}`,
    mood:
      (movie.vote_average ?? 0) > 8
        ? "epic"
        : genres.includes("Comedy") || genres.includes("Romance")
          ? "cozy"
          : genres.includes("Action") || genres.includes("Thriller")
            ? "electric"
            : "mind-bending",
    source: "tmdb",
  };
}
