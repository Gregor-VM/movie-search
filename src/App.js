import React from 'react';
import './Global.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchBar from './components/SearchBar';
import ShowBar from './components/ShowBar';
import Layout from './components/Layout';
import MovieState from './context/MovieState'


function App() {
  return (
    <>
      <MovieState>
        <Layout>
          <SearchBar />
          <ShowBar />
        </Layout>
      </MovieState>
    </>
  )
}

export default App;
