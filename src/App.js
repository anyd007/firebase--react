import { useEffect, useState } from "react";
import Auth from "./components/Auth";
import { db, auth, storage } from './config/firebase'
import { getDocs, collection, addDoc, deleteDoc, updateDoc, doc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";


function App() {
  const [movieList, setMovieList] = useState([])
  const moviesCollectionref = collection(db, "movies")

  const [movieTitle, setMovieTitle] = useState('')
  const [movieYear, setMovieYear] = useState(0)
  const [oscar, setOscar] = useState(false)

  const [updateTitle, setUpdateTitle] = useState('')

  const [fileUpload, setFileUpload] = useState(null)

  const getMovieList = async () => {

    try {
      const data = await getDocs(moviesCollectionref)
     
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }))
      setMovieList(filteredData)
    }
    catch (err) {
      console.error(err.message);
      
    }
  }

  useEffect(() => {
    getMovieList()
  }, [])

  const addMovie = async () => {
    try {
      await addDoc(moviesCollectionref, {
        title: movieTitle,
        realiseDate: movieYear,
        oscars: oscar,
        userId: auth?.currentUser?.uid
      })
      getMovieList()
    }
    catch (err) {
      console.error(err.message)
    }
  }

  const deleteMovie = async (id) => {
    try {
      const movieDoc = doc(db, "movies", id)
      await deleteDoc(movieDoc)
      getMovieList()
    }
    catch (err) {
      console.error(err.message)
    }
  }

  const updateMovieTitles = async (id) => {
    try{
      const movieDoc = doc(db, "movies", id)
      await updateDoc(movieDoc, {title: updateTitle})
      getMovieList()
    }
    catch(err){
      console.error(err.message)
    }
  }

  const uploadFile = async () => {
    if(!fileUpload) return;
    const filesFolderRef = ref(storage, `projectFolder/${fileUpload.name}`)
    try {
    await uploadBytes(filesFolderRef, fileUpload)
    }
    catch(err){
      console.error(err.message)
    }
  }

  return (
    <div className="App">
      <Auth />

      <input
        type="text"
        placeholder="tytuł"
        value={movieTitle}
        onChange={(e) => setMovieTitle(e.target.value)}
      />
      <input
        type="number"
        placeholder="rok"
        value={movieYear}
        onChange={(e) => setMovieYear(Number(e.target.value))}
      />
      <input
        type="checkbox"
        checked={oscar}
        onChange={(e) => setOscar(e.target.checked)}
      />
      <label>czy jest oskar?</label>
      <button onClick={addMovie}>doaj</button>

      <div>{movieList.map((movie) => (
        <div key={movie.id}>
          <h1>{movie.title}</h1>
          <button onClick={() => deleteMovie(movie.id)}>usuń</button>
          <input 
          type="text" 
          placeholder="zmien tytuł"
          value={updateTitle}
          onChange={(e) => setUpdateTitle(e.target.value)}
          />
          <button onClick={() => updateMovieTitles(movie.id)}>zmień tytuł</button>
        </div>
      ))}
      </div>
      <div>
        <input 
        type="file" 
        onChange={(e) => setFileUpload(e.target.files[0])}
        />
        <button onClick={uploadFile}>wrzuć plik</button>
      </div>
    </div>
  );
}

export default App;
