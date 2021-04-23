import React, { useState, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/layouts/Navbar';
import Users from './components/users/Users.js';
import User from './components/users/User.js';
import Search from './components/users/Search';
import Alert from './components/layouts/Alert';
import About from './components/pages/About';
import axios from 'axios';
import GithubState from './context/github/GithubState';

const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  // async componentDidMount() {
  //   this.setState({ loading: true });
  //   const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
  //   this.setState({ users: res.data, loading: false });
  // }

  // const searchUsers = async (text) => {
  //   setLoading(true);

  //   const res = await axios.get(`https://api.github.com/search/users?q=${text}`, {
  //     headers: {
  //       Authorization: `${process.env.REACT_APP_GITHUB_TOKEN}`,
  //     },
  //   });

  //   setUsers(res.data.items);
  //   setLoading(false);
  // };

  //Get single Github User
  const getUser = async (username) => {
    setLoading(true);

    const res = await axios.get(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `${process.env.REACT_APP_GITHUB_TOKEN}`,
      },
    });

    setUser(res.data);
    setLoading(false);
  };

  //Get users repositories
  const getUserRepos = async (username) => {
    setLoading(true);

    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc`, {
      headers: {
        Authorization: `${process.env.REACT_APP_GITHUB_TOKEN}`,
      },
    });

    setRepos(res.data);
    setLoading(false);
  };

  //Clear Users from state
  const clearUsers = () => {
    setUsers([]);
    setLoading(false);
  };

  // set up the alert
  const showAlert = (message, type) => {
    setAlert({ message: message, type: type });

    setTimeout(() => setAlert(null), 5000);
  };

  return (
    <GithubState>
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Alert alert={alert} />
            <Switch>
              <Route
                exact
                path="/"
                render={(props) => (
                  <Fragment>
                    <Search clearUsers={clearUsers} showClear={users.length > 0 ? true : false} setAlert={showAlert} />
                    <Users />
                  </Fragment>
                )}
              ></Route>
              <Route exact path="/about" component={About} />
              <Route exact path="/user/:login" render={(props) => <User {...props} getUser={getUser} getUserRepos={getUserRepos} user={user} repos={repos} loading={loading} />} />
            </Switch>
          </div>
        </div>
      </Router>
    </GithubState>
  );
};

export default App;
