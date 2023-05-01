import { useEffect, useState } from 'react'
import './App.css'
import searchIcon from './search.svg'
import MovieCard from './MovieCard.js'

const ApiKey = 'b213a887'
const ApiURL = `http://www.omdbapi.com?apikey=${ApiKey}`


function App() {

  const [ movies, setMovies ] = useState([]);
  const [ searchTerm, setSeachTerm ] = useState('')
  
  const searchMovies = async (title) => {
    const res = await fetch(`${ApiURL}&s=${title}`)
    const data = await res.json();
    setMovies(data.Search);
  }

  useEffect(() => {
    searchMovies('superman')
  }, [])

  return (
    <div className="app">
      <h1>MovieLand</h1>

      <div className="search">
        <input placeholder="Find Movie.." value={searchTerm} onChange={(e) => setSeachTerm(e.target.value) } />
        <img src={searchIcon} alt="seach icon" onClick={() => searchMovies(searchTerm)}/>
      </div>

      {
        movies?.length > 0 ? (
          <div className = "container">
            {movies.map((movie) => (
              <MovieCard movie = {movie} />
            ))}
          </div>
        ) : (
          <div className="empty">
            <h2>No movies found...</h2>
          </div>
        )
      }

      
    </div>
  );
}

export default App;
