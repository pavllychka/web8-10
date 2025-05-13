import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <img src={movie.poster} alt={`${movie.title} постер`} />
      <h3>{movie.title}</h3>
      <p>{movie.description}</p>
      <p><strong>Жанр:</strong> {movie.genre}</p>
      <p><strong>Сеанс:</strong> {movie.showtime}</p>
      <Link to={`/booking/${movie.id}`}>
        <button>Забронювати</button>
      </Link>
    </div>
  );
};

export default MovieCard;