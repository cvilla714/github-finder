import React from 'react';
import './App.css';
import Navbar from './components/layouts/Navbar';

class App extends React.Component {
  render() {
    return (
      <nav className="navbar bg-primary">
        <Navbar />
      </nav>
    );
  }
}

export default App;
