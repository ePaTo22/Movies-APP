import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getMovies, addMovieFavorite } from "../../actions";
import s from "./Buscador.module.css";

export class Buscador extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
    };
  }
  handleChange(event) {
    this.setState({ title: event.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.getMovies(this.state.title);
  }

  render() {
    const { title } = this.state;
    return (
      <div>
        <div className={s.contsearch}>
          <h2 className={s.titulo}>Search Movies: </h2>
          <form className={s.form} onSubmit={(e) => this.handleSubmit(e)}>
            <div>
              <input
                className={s.input}
                type="text"
                id="title"
                autoComplete="off"
                value={title}
                onChange={(e) => this.handleChange(e)}
              />
            </div>
            <button type="submit" className={s.button}>
              SEARCH
            </button>
          </form>
        </div>

        <ul className={s.favcont}>
          {this.props.movies?.map((m) => (
            <div key={m.imdbID} className={s.divmap}>
              <div className={s.divlinks}>
                <Link to={`/movie/${m.imdbID}`} className={s.links}>
                  {m.Title.slice(0, 23)}
                </Link>
              </div>
              <Link to={`/movie/${m.imdbID}`}>
                <img src={m.Poster} alt="Imagen Pelicula" className={s.img} />
              </Link>
            </div>
          ))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    movies: state.moviesLoaded,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addMovieFavorite: (movie) => dispatch(addMovieFavorite(movie)),
    getMovies: (titulo) => dispatch(getMovies(titulo)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Buscador);
