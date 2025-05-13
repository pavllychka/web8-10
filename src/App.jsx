import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MovieList from './components/MovieList';
import movies from './data/movies';

const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <h1>Дошка фільмів</h1>
        <Routes>
          <Route path="/" element={<MovieList movies={movies} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;