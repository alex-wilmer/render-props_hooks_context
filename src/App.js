import React, { createContext } from "react";
import "./App.css";

const TextContext = createContext()

function CoolInput () {
  return (
    <TextContext.Consumer>
      {value => 
        <input value={value.text} onChange={value.setText} />
      }
    </TextContext.Consumer>
  )
}

class App extends React.Component {
  state = {
    text: 123
  }
  
  setText = e => this.setState({ text: e.target.value })
  
  render() {
    return (
      <TextContext.Provider value={{
        text: this.state.text,
        setText: this.setText
      }}>
        <CoolInput />
      </TextContext.Provider>
    )
  }
}

export default App