import React from 'react';
import MovieList from './components/MovieList';
import movies from './data/movies';

const App = () => {
  return (
    <div className="app">
      <h1>Дошка фільмів</h1>
      <MovieList movies={movies} />
    </div>
  );
};

export default App;