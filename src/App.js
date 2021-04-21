import React from 'react';
import './App.css';
import Navbar from './components/layouts/Navbar';
import Users from './components/users/Users.js';
import axios from 'axios';
class App extends React.Component {
  componentDidMount() {
    axios.get('https://api.github.com/users').then((res) => console.log(res.data));
  }
  render() {
    return (
      <div className="App">
        <Navbar />
        <div className="container">
          <Users />
        </div>
      </div>
    );
  }
}

export default App;
