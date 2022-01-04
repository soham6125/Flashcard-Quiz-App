import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Home from './Home';

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
      {/* {isLoading && <Loader />} */}
      {!isLoading && <Home categories={categories} />}
    </div>
  );
}

export default App;