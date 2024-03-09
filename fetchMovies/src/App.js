import React, { useState } from 'react';
import MoviesList from './components/MoviesList';
import { Circles } from 'react-loader-spinner';
import './App.css';

function App() {
  const [dummyMovies, setDummyMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  const handleFetchMovies = async () => {
    setIsError(null);
    setIsLoading(true);
    try {
      const response = await fetch("https://www.swapi.tech/api/films/");
      if (!response.ok) {
        throw new Error('Failed to fetch movies ...');
      }
      const data = await response.json();

      const dummy = data.result.map((movie) => ({
        id: movie.properties['episode_id'],
        title: movie.properties.title,
        openingText: movie.properties.opening_crawl,
        releaseDate: movie.properties.release_date
      }));
      setDummyMovies(dummy);
    } catch (error) {
      setIsError(error.message);
    } 
    setIsLoading(false);  
  };

  return (
    <React.Fragment>
      <section>
        <button onClick={handleFetchMovies}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && !isError && <MoviesList movies={dummyMovies} />}
        {!isLoading && isError && <p>{isError}</p>}
        {isLoading && !isError && (
          <Circles height="80" width="80" color="#4fa94d" ariaLabel="circles-loading" wrapperStyle={{}} wrapperClass="" visible={true} />
        )}
      </section>
    </React.Fragment>
  );
}

export default App;
