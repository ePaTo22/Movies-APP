"use client";

import Image from "next/image";
import {
  Clapperboard,
  Film,
  Flame,
  Heart,
  Loader2,
  Play,
  Search,
  Sparkles,
  Star,
  Wand2,
} from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";
import type { Movie } from "@/lib/movies";

type Props = {
  initialMovies: Movie[];
};

type ApiResponse = {
  source: "curated" | "tmdb";
  movies: Movie[];
};

const moods = [
  { id: "all", label: "All", icon: Sparkles },
  { id: "epic", label: "Epic", icon: Flame },
  { id: "mind-bending", label: "Mind-bending", icon: Wand2 },
  { id: "electric", label: "Electric", icon: Play },
  { id: "cozy", label: "Cozy", icon: Heart },
];

export function MovieExplorer({ initialMovies }: Props) {
  const [query, setQuery] = useState("");
  const [mood, setMood] = useState("all");
  const [movies, setMovies] = useState<Movie[]>(initialMovies);
  const [selectedId, setSelectedId] = useState(initialMovies[0]?.id);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  const selectedMovie = useMemo(
    () => movies.find((movie) => movie.id === selectedId) ?? movies[0],
    [movies, selectedId],
  );

  const favoriteMovies = movies.filter((movie) => favorites.includes(movie.id));
  const averageRating =
    movies.length > 0
      ? (movies.reduce((total, movie) => total + movie.rating, 0) / movies.length).toFixed(1)
      : "0.0";

  async function loadMovies(nextQuery = query, nextMood = mood) {
    setLoading(true);

    try {
      const params = new URLSearchParams({
        query: nextQuery,
        mood: nextMood,
      });
      const response = await fetch(`/api/movies?${params.toString()}`);
      const data = (await response.json()) as ApiResponse;

      setMovies(data.movies);
      setSelectedId(data.movies[0]?.id);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void loadMovies();
  }

  function selectMood(nextMood: string) {
    setMood(nextMood);
    void loadMovies(query, nextMood);
  }

  function toggleFavorite(movieId: number) {
    setFavorites((current) =>
      current.includes(movieId) ? current.filter((id) => id !== movieId) : [...current, movieId],
    );
  }

  useEffect(() => {
    const stored = window.localStorage.getItem("cinestack:favorites");
    if (stored) {
      setFavorites(JSON.parse(stored) as number[]);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("cinestack:favorites", JSON.stringify(favorites));
  }, [favorites]);

  return (
    <main className="min-h-screen overflow-hidden bg-[#08090d] text-white">
      <section className="relative isolate min-h-screen px-5 py-5 sm:px-7 lg:px-10">
        {selectedMovie ? (
          <Image
            src={selectedMovie.backdrop}
            alt=""
            fill
            priority
            sizes="100vw"
            className="absolute inset-0 -z-20 object-cover opacity-35 blur-[1px] scale-105 transition-all duration-700"
          />
        ) : null}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_5%,rgba(255,83,73,.33),transparent_28%),radial-gradient(circle_at_80%_0%,rgba(34,211,238,.2),transparent_26%),linear-gradient(180deg,rgba(8,9,13,.62),#08090d_78%)]" />
        <div className="mx-auto flex max-w-7xl flex-col gap-6">
          <header className="flex flex-wrap items-center justify-between gap-4 rounded-[28px] border border-white/10 bg-white/[.06] px-4 py-3 shadow-2xl shadow-black/20 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className="grid size-11 place-items-center rounded-2xl bg-white text-black">
                <Clapperboard size={22} />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[.22em] text-cyan-200">CineStack</p>
                <h1 className="text-xl font-semibold leading-none sm:text-2xl">Movie Discovery Lab</h1>
              </div>
            </div>
          </header>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
            <section className="flex min-h-[calc(100vh-130px)] flex-col justify-between gap-7 py-2">
              <div className="max-w-3xl animate-rise">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-200/20 bg-cyan-200/10 px-3 py-1.5 text-sm text-cyan-100">
                  <Film size={16} />
                  Built with Next.js, TypeScript, and a TMDb-ready API route
                </div>
                <h2 className="text-balance text-5xl font-black leading-[.92] sm:text-7xl lg:text-8xl">
                  Find the next film worth talking about.
                </h2>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-white/72">
                  Search, filter by vibe, save favorites, and scan cinematic picks in a polished interface designed for a portfolio walkthrough.
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="grid gap-3 rounded-[30px] border border-white/10 bg-white/[.08] p-3 shadow-2xl shadow-black/30 backdrop-blur-xl sm:grid-cols-[1fr_auto]"
              >
                <label className="relative block">
                  <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/45" size={20} />
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search a movie, actor, genre, or mood"
                    className="h-14 w-full rounded-2xl border border-white/10 bg-black/35 pl-12 pr-4 text-base outline-none transition focus:border-cyan-200/70 focus:bg-black/50"
                  />
                </label>
                <button
                  type="submit"
                  className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-white px-6 font-bold text-black transition hover:-translate-y-0.5 hover:bg-cyan-100 disabled:opacity-70"
                  disabled={loading}
                >
                  {loading ? <Loader2 className="animate-spin" size={19} /> : <Search size={19} />}
                  Discover
                </button>
              </form>

              <div className="flex flex-wrap gap-2">
                {moods.map((item) => {
                  const Icon = item.icon;
                  const active = mood === item.id;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => selectMood(item.id)}
                      className={`inline-flex h-11 items-center gap-2 rounded-full border px-4 text-sm font-semibold transition hover:-translate-y-0.5 ${
                        active
                          ? "border-white bg-white text-black"
                          : "border-white/10 bg-white/[.06] text-white/76 hover:border-white/35"
                      }`}
                    >
                      <Icon size={16} />
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </section>

            <aside className="grid gap-4 self-start lg:sticky lg:top-5">
              <div className="rounded-[28px] border border-white/10 bg-black/35 p-4 shadow-2xl shadow-black/30 backdrop-blur-xl">
                {selectedMovie ? (
                  <article className="group">
                    <div className="relative aspect-[16/10] overflow-hidden rounded-3xl">
                      <Image
                        src={selectedMovie.backdrop}
                        alt={selectedMovie.title}
                        fill
                        sizes="(min-width: 1024px) 380px, 100vw"
                        className="object-cover transition duration-700 group-hover:scale-105"
                      />
                      <button
                        type="button"
                        onClick={() => toggleFavorite(selectedMovie.id)}
                        className="absolute right-3 top-3 grid size-11 place-items-center rounded-full bg-black/45 backdrop-blur transition hover:scale-105"
                        aria-label="Toggle favorite"
                      >
                        <Heart
                          size={20}
                          className={favorites.includes(selectedMovie.id) ? "fill-red-400 text-red-400" : "text-white"}
                        />
                      </button>
                    </div>
                    <div className="pt-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-2xl font-black">{selectedMovie.title}</h3>
                          <p className="mt-1 text-sm text-white/55">
                            {selectedMovie.year} / {selectedMovie.runtime}
                          </p>
                        </div>
                        <div className="inline-flex items-center gap-1 rounded-full bg-amber-300 px-3 py-1 text-sm font-black text-black">
                          <Star size={15} className="fill-black" />
                          {selectedMovie.rating}
                        </div>
                      </div>
                      <p className="mt-4 leading-7 text-white/68">{selectedMovie.overview}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {selectedMovie.genres.map((genre) => (
                          <span key={genre} className="rounded-full border border-white/10 bg-white/[.06] px-3 py-1 text-sm text-white/70">
                            {genre}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                ) : (
                  <p className="py-12 text-center text-white/65">No movies matched that search.</p>
                )}
              </div>

              <div className="grid grid-cols-3 gap-3">
                <Stat label="Results" value={String(movies.length)} />
                <Stat label="Avg" value={averageRating} />
                <Stat label="Saved" value={String(favorites.length)} />
              </div>
            </aside>
          </div>

          <section className="pb-10">
            <div className="mb-4 flex items-center justify-between gap-4">
              <h2 className="text-2xl font-black">Now on deck</h2>
              <p className="text-sm text-white/50">{favoriteMovies.length > 0 ? `${favoriteMovies.length} saved in this view` : "Hover and save standouts"}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {movies.map((movie, index) => (
                <button
                  key={movie.id}
                  type="button"
                  onClick={() => setSelectedId(movie.id)}
                  className={`group animate-rise overflow-hidden rounded-[26px] border bg-white/[.06] text-left shadow-xl shadow-black/20 transition duration-300 hover:-translate-y-1 hover:border-white/35 ${
                    selectedMovie?.id === movie.id ? "border-cyan-200/70" : "border-white/10"
                  }`}
                  style={{ animationDelay: `${index * 45}ms` }}
                >
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src={movie.poster}
                      alt={movie.title}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-4">
                      <div className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-xs font-black text-black">
                        <Star size={13} className="fill-black" />
                        {movie.rating}
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="line-clamp-1 text-lg font-black">{movie.title}</h3>
                    <p className="mt-1 text-sm text-white/50">{movie.year}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {movie.genres.slice(0, 2).map((genre) => (
                        <span key={genre} className="rounded-full bg-white/[.08] px-2 py-1 text-xs text-white/62">
                          {genre}
                        </span>
                      ))}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[.06] p-4 text-center backdrop-blur-xl">
      <p className="text-2xl font-black">{value}</p>
      <p className="mt-1 text-xs font-semibold uppercase tracking-[.18em] text-white/45">{label}</p>
    </div>
  );
}
