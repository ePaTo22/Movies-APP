import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { removeMovieFavorite } from "../../actions/index";
import s from "./Favorites.module.css";
import { BsTrash } from "react-icons/bs";

export class ConnectedList extends Component {
  render() {
    return (
      <div>
        <h2 className={s.titulo}>Películas Favoritas</h2>
        <div className={s.contout}>
          {this.props.movies?.map((e, index) => (
            <div key={index} className={s.continside}>
              <div>
                <Link to={`/movie/${e.id}`} className={s.link}>
                  {e.titulo}{" "}
                </Link>
              </div>

              <button
                onClick={() => this.props.removeMovieFavorite(e.id)}
                className={s.button}
              >
                <BsTrash />
              </button>
              <img src={e?.img} alt="Imagen Pelicula" className={s.img} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    movies: state.favoritas, //Retorno a movies el valor de lo que haya en moviesLoaded del estado del reducer
  };
}

function mapDispatchToProps(dispatch) {
  return {
    removeMovieFavorite: (imdbID) => dispatch(removeMovieFavorite(imdbID)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedList);
