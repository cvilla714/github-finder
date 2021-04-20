import React from 'react';
import './App.css';

class App extends React.Component {
  render() {
    const name = 'Cosmel Villalobos';
    return (
      <div className="App">
        <h1>hello from {name}</h1>
      </div>
    );
  }
}

export default App;
