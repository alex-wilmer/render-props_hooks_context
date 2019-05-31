import React, { useState, useEffect } from "react";
import "./App.css";

function useSearchLogic () {
  const [images, setImages] = useState([])
  const [query, setQuery] = useState('cats')
  const [loading, setLoading] = useState(true)
  
  let fetchImages = () => {
    setLoading(true)
    fetch(`https://www.reddit.com/r/aww/search.json?q=${query}%5C&restrict_sr=1`)
      .then(response => response.json())
      .then(json => {
        setLoading(false)      
        setImages(json.data.children.map(child => child.data))
      })    
  }
  
  useEffect(() => {
    fetchImages()
  }, [query])
  
  return {
    loading,
    images,
    query,
    setQuery,
  }
}

function App () {
  const logic = useSearchLogic()
  return (
    <div>
      <h1>cute images from reddit {logic.loading && 'loading'}</h1>
      <input 
        value={logic.query} 
        onChange={event => {
          logic.setQuery(event.target.value)
        }}
      />
      <hr />
      {logic.images.map(img =>
        <img key={img.id} src={img.thumbnail} />
      )}
    </div>  
  )
}

export default App;
