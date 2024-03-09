import React,{useState} from 'react';

import MoviesList from './components/MoviesList';
import { Circles } from 'react-loader-spinner'
;
import './App.css';

function App() {
  const [dummyMovies,setDummyMovies] = useState([])
  const [iSLoading,setIsLoading] =useState(false)

 const handleFetchMovies = async()=>
    {
        setIsLoading(true)
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
      setIsLoading(false)
    }

  return (
    <React.Fragment>
      <section>
        <button onClick={handleFetchMovies}>Fetch Movies</button>
      </section>
      <section>
       {!iSLoading && <MoviesList movies={dummyMovies} />} 
        {
        iSLoading && <Circles height="80" width="80" color="#4fa94d" ariaLabel="circles-loading" wrapperStyle={{}} wrapperClass="" visible={true}/>
        }
      </section>
    </React.Fragment>
  );
}

export default App;
