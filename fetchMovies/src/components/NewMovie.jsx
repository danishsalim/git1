import React,{useMemo, useState} from 'react'
import "./NewMovie.css"
const NewMovie = (props) => {
  // const [movieDetail,setMovieDetail] = useState()  
  
  const handleSubmit=(e)=>{
    e.preventDefault()
    const movie ={
        title:e.target.title.value,
        releaseDate:e.target.date.value,
        openingText:e.target.openingText.value,
    }
     props.onAddMovie(movie)
  }

  return (
    <form onSubmit={handleSubmit}>
        <div className='inputData'>
            <label htmlFor='title' >Title</label>
            <input type="text" id='title' />
        </div>
        <div className='inputData' >
            <label htmlFor="openingText">opening text</label>
            <textarea id='openingText' />
        </div>
        <div className='inputData'>
            <label htmlFor="date">Release Date</label>
            <input type="date"  id='date' />
        </div>
        <button type='submit'>Add Movie</button>
    </form>
  )
}

export default NewMovie