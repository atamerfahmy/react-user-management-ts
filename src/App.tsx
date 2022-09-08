import React, { useEffect } from 'react';
// import logo from './logo.svg';
import './App.css';
import Layout from './components/Layout';
import { useDispatch, useSelector } from 'react-redux'
import store, { RootState } from './store/store';
import { setUsers } from './store/slices/users/users.slice';
import { fetchUsersAction } from './store/slices/users/users.actions';

function App() {

  useEffect(() => {
    store.dispatch(fetchUsersAction({ page: 0, limit: 25 }))
  }, [])

  return (
    <Layout />
  );
}

export default App;
