import React, { useState } from 'react';
import MovieCard from './MovieCard';

const MovieList = ({ movies }) => { // Оголошує функціональний компонент MovieList, який приймає проп movies (масив фільмів)
  const [searchTerm, setSearchTerm] = useState(''); // Створює стан searchTerm (рядок пошуку) із початковим значенням '' і функцію setSearchTerm для його оновлення
  const [selectedMovie, setSelectedMovie] = useState(null);

  const filteredMovies = movies.filter((movie) => // Фільтрує масив movies, створюючи filteredMovies із фільмами, що відповідають пошуковому запиту
    movie.title.toLowerCase().includes(searchTerm.toLowerCase()) // Перевіряє, чи містить назва фільму (у нижньому регістрі) текст searchTerm (у нижньому регістрі)
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