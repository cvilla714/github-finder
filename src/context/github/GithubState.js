import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import { SEARCH_USERS, SET_LOADING, CLEAR_USERS, GET_USER, GET_REPOS } from '../types';

const GithubState = (props) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  //Search users

  const searchUsers = async (text) => {
    setLoading();

    const res = await axios.get(`https://api.github.com/search/users?q=${text}`, {
      headers: {
        Authorization: `${process.env.REACT_APP_GITHUB_TOKEN}`,
      },
    });

    // setUsers(res.data.items);
    // setLoading(false);
    dispatch({
      type: SEARCH_USERS,
      payload: res.data.items,
    });
  };

  //Get Users
  const getUser = async (username) => {
    setLoading();

    const res = await axios.get(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `${process.env.REACT_APP_GITHUB_TOKEN}`,
      },
    });

    // setUser(res.data);
    // setLoading(false);
    dispatch({
      type: GET_USER,
      payload: res.data,
    });
  };

  //Get Repost

  //Clear users
  const clearUsers = () => dispatch({ type: CLEAR_USERS });

  //Set loading
  const setLoading = () => {
    dispatch({ type: SET_LOADING });
  };
  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser,
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
