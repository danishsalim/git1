import React, { useCallback, useEffect, useState } from 'react';
import MoviesList from './components/MoviesList';
import { Circles } from 'react-loader-spinner';
import './App.css';
import NewMovie from './components/NewMovie';

function App() {
  const [dummyMovies, setDummyMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  const handleFetchMovies = useCallback(async () => {
    setIsError(null);
    setIsLoading(true);
    try {
      // https://www.swapi.tech/api/films/
      const response = await fetch("https://add-movie-a7567-default-rtdb.firebaseio.com/movies.json/");
      if (!response.ok) {
        throw new Error('Failed to fetch movies ...');
      }
      const data = await response.json();
      console.log(data)
      const loadedMovies = []
      for(let key in data)
      {
        loadedMovies.push({
          id:key,
          title:data[key].title,
          openingText:data[key].openingText,
          releaseDate:data[key].releaseDate,
        })
      }
      setDummyMovies(loadedMovies);
    } catch (error) {
      setIsError(error.message);
    } 
    setIsLoading(false);  
  },[]);

  useEffect(()=>{handleFetchMovies()},[handleFetchMovies])

  async function addMovieHandler(movie)
  {
    const response = await fetch("https://add-movie-a7567-default-rtdb.firebaseio.com/movies.json",{
      method:'POST',
      body:JSON.stringify(movie),
      headers:{
        'Content-Type':'application/json'
      }
    })
    const data = await response.json()                 
    console.log(data)
    handleFetchMovies()
  }

  async function deleteMovieHandler(movieId) {
    try {
      // Construct the URL to the specific movie node
      const url = `https://add-movie-a7567-default-rtdb.firebaseio.com/movies/${movieId}.json`;
  
      // Send a PATCH request with null as the value to delete the movie
      const response = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(null),
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      // Check if the request was successful
      if (!response.ok) {
        throw new Error('Failed to delete movie');
      }
  
      // Read and log the response data
      const data = await response.json();
      console.log(data);
      handleFetchMovies()
    } catch (error) {
      console.error(error);
    }
  }
  
  return (
    <React.Fragment>
      <section>
        <NewMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={handleFetchMovies}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && !isError && dummyMovies.length &&
          <MoviesList movies={dummyMovies} deleteMovieHandler={deleteMovieHandler} /> 
          || <p>no movies available</p>}
        {!isLoading && isError && <p>{isError}</p>}
        {isLoading && !isError && (
          <Circles height="80" width="80" color="#4fa94d" ariaLabel="circles-loading" wrapperStyle={{}} wrapperClass="" visible={true} />
        )}
      </section>
    </React.Fragment>
  );
}

export default App;