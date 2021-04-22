import React, { Component } from 'react';
import './App.css';
import Navbar from './components/layouts/Navbar';
import Users from './components/users/Users.js';
import Search from './components/users/Search';
import PropTypes from 'prop-types';
import Alert from './components/layouts/Alert';
import axios from 'axios';

class App extends Component {
  state = {
    users: [],
    loading: false,
    alert: null,
  };

  static propTypes = {
    searchUsers: PropTypes.func.isRequired,
  };
  // async componentDidMount() {
  //   this.setState({ loading: true });
  //   const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
  //   this.setState({ users: res.data, loading: false });
  // }

  searchUsers = async (text) => {
    this.setState({ loading: true });

    const res = await axios.get(`https://api.github.com/search/users?q=${text}`, {
      headers: {
        Authorization: `${process.env.REACT_APP_GITHUB_TOKEN}`,
      },
    });

    this.setState({ users: res.data.items, loading: false });
  };

  //Clear Users from state
  clearUsers = () => this.setState({ users: [], loading: false });
  // set up the alert
  setAlert = (message, type) => {
    this.setState({ alert: { message: message, type: type } });

    setTimeout(() => this.setState({ alert: null }), 5000);
  };

  render() {
    const { loading, users } = this.state;
    return (
      <div className="App">
        <Navbar />
        <div className="container">
          <Alert alert={this.state.alert} />
          <Search searchUsers={this.searchUsers} clearUsers={this.clearUsers} showClear={users.length > 0 ? true : false} setAlert={this.setAlert} />
          <Users loading={loading} users={users} />
        </div>
      </div>
    );
  }
}

export default App;
