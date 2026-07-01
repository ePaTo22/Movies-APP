import { curatedMovies } from "@/lib/movies";
import { MovieExplorer } from "@/components/movie-explorer";

export default function Home() {
  return <MovieExplorer initialMovies={curatedMovies} />;
}
