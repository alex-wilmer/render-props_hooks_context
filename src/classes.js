

import React from "react";
import "./App.css";

function Search (props) {
  return (
    <>
      <input 
        value={props.query} 
        onChange={event => {
          props.setQuery(event.target.value)
          props.fetchImages()
        }}
      />
      <hr />
      {props.images.map(img =>
        <img key={img.id} src={img.thumbnail} />
      )}
    </>
  )
}

class SearchLogic extends React.Component {
  state = {
    images: [],
    query: 'cats',
    loading: true,
  }
  
  componentDidMount() {
    this.fetchImages()
  }
  
  setQuery = query => {
    this.setState({ query: query })
  }
  
  fetchImages = () => {
    this.setState({ loading: true })
    fetch(`https://www.reddit.com/r/aww/search.json?q=${this.state.query}%5C&restrict_sr=1`)
      .then(response => response.json())
      .then(json => {
        this.setState({
          images: json.data.children
            .map(child => {
              return child.data
            }),
          loading: false
        })    
      })
  }
  
  render() {
    return this.props.children({
      loading: this.state.loading,
      images: this.state.images,
      query: this.state.query,
      setQuery: this.setQuery,
      fetchImages: this.fetchImages
    })
  }
}

function App () {
  return (
    <div>
      <SearchLogic>
        {logic =>
          <>
          <h1>cute images from reddit {logic.loading && 'loading'}</h1>
          <Search
            images={logic.images}
            query={logic.query}
            setQuery={logic.setQuery}
            fetchImages={logic.fetchImages}
          /> 
          </>
        }
      </SearchLogic>
    </div>  
  )
}

export default App;
