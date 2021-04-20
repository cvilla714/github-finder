import React from 'react';
import './App.css';
import Navbar from './components/layouts/Navbar';
// import UserItem from './components/users/UserItem';
import Users from './components/users/Users.js';

class App extends React.Component {
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
