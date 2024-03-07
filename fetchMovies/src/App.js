import React,{useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [dummyMovies,setDummyMovies] = useState([])

 const handleFetchMovies = async()=>
    {
        const response = await fetch("https://www.swapi.tech/api/films/")
        const data= await response.json()
        const dummy = data.result.map((movie)=>{
          return {
            id:movie.properties['episode_id'],
            title:movie.properties.title,
            openingText:movie.properties.opening_crawl,
            releaseDate:movie.properties.release_date        
          }
      })
      setDummyMovies(dummy) 
    }

  return (
    <React.Fragment>
      <section>
        <button onClick={handleFetchMovies}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={dummyMovies} />
      </section>
    </React.Fragment>
  );
}

export default App;
