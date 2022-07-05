import React from "react";
import { connect } from "react-redux";
import { getMovieDetail, addMovieFavorite } from "../../actions/index";
import s from "./Movie.module.css";
import { MdOutlineFavoriteBorder } from "react-icons/md";

class Movie extends React.Component {
  componentDidMount() {
    this.props.getMovieDetail(this.props.match.params.id);
  }

  render() {
    return (
      <div className={s.container}>
        <div className={s.tituimg}>
          <h2 className={s.title}>{this.props.movie.Title}</h2>
          <img
            src={this.props.movie.Poster}
            alt="Imagen Pelicula"
            className={s.img}
          />
        </div>

        <div className={s.details}>
          <button
            className={s.fav}
            onClick={() =>
              this.props.addMovieFavorite({
                titulo: this.props.movie.Title,
                id: this.props.movie.imdbID,
                img: this.props.movie.Poster,
              })
            }
          >
            <MdOutlineFavoriteBorder />
          </button>
          <h3>{this.props.movie.Actors}</h3>
          <h3>{this.props.movie.Runtime}</h3>
          <h4>{this.props.movie.Plot}</h4>
          <h3>{this.props.movie.Released}</h3>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    movie: state.movieDetail,
  };
}

export default connect(mapStateToProps, { getMovieDetail, addMovieFavorite })(
  Movie
);
