import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [movies, setMovies] = useState([
    {
      title: "",
      genre: "",
      year: "",
    },
  ]);

  const [movie, setMovie] = useState([
    {
      title: "",
      genre: "",
      year: "",
    },
  ]);

  useEffect(() => {
    fetch("/movies")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((jsonRes) => setMovies(jsonRes));
  });

  function handleChange(e) {
    //this event funtion takes two values NAME and VALUES
    const { name, value } = e.target;
    setMovie((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
  }

  function addMovie(e) {
    e.preventDefault();
    alert("movie added");
    const newMovie = {
      title: movie.title,
      genre: movie.genre,
      year: movie.year,
    };
    axios.post("/newmovie", newMovie);
  }

  function deleteMovie(id) {
    axios.delete("/delete/" + id);
    alert("Movie Deleted");
  }

  return (
    <div className="App">
      <h1>Add Movie</h1>
      <form>
        <input onChange={handleChange} name="title" value={movie.title}></input>
        <input onChange={handleChange} name="genre" value={movie.genre}></input>
        <input onChange={handleChange} name="year" value={movie.year}></input>
        <button onClick={addMovie}>ADD MOVIE</button>
      </form>
      {movies.map((movie, index) => {
        return (
          <div key={index}>
            <h1>{movie.title}</h1>
            <p>{movie.genre}</p>
            <p>{movie.year}</p>
            <button onClick={() => deleteMovie(movie._id)}>DELETE</button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
