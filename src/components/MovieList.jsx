import React, { useState } from 'react';
import MovieCard from './MovieCard';

const MovieList = ({ movies }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openModal = (movie) => {
    setSelectedMovie(movie);
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="movie-list">
      <input
        type="text"
        placeholder="Пошук за назвою..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <div className="movies-grid">
        {filteredMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} onClick={openModal} />
        ))}
      </div>
      {selectedMovie && (
        <div className="modal">
          <div className="modal-content">
            <h3>{selectedMovie.title}</h3>
            <p>{selectedMovie.description}</p>
            <p><strong>Жанр:</strong> {selectedMovie.genre}</p>
            <p><strong>Сеанс:</strong> {selectedMovie.showtime}</p>
            <button onClick={closeModal}>Закрити</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieList;