import React, { useState, useEffect } from 'react';
import './App.css'
import axios from 'axios'
import Home from './Home';
import Loader from './Loader';

function App() {
  const [categories, setCategories] = useState([])
  const [isLoading, setisLoading] = useState(true);
  useEffect(() => {
    axios
      .get('https://opentdb.com/api_category.php')
      .then(res => {
        setCategories(res.data.trivia_categories)
        setisLoading(false);
      })
  }, [])

  return (
    <div>
      {isLoading && <Loader />}
      {!isLoading && <Home />}
    </div>
  );
}

export default App;