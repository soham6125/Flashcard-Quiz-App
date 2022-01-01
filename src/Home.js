import React, { useState, useRef } from 'react';
import './Home.css';
import axios from 'axios'
import FlashcardList from './FlashcardList';

function Home(props) {
     
  const [flashcards, setFlashcards] = useState([])
  const [categories] = useState(props.categories)

  const categoryEl = useRef()
  const amountEl = useRef()

  function decodeString(str) {
    const textArea = document.createElement('textarea')
    textArea.innerHTML = str
    return textArea.value
  }

  function handleSubmit(e) {
    e.preventDefault();
    axios.get('https://opentdb.com/api.php', {
      params: {
        amount: amountEl.current.value,
        category: categoryEl.current.value
      }
    })
    .then(res => {
      setFlashcards(res.data.results.map((questionItem, index) => {
        const answer = decodeString(questionItem.correct_answer)
        const options = [...questionItem.incorrect_answers.map(a => decodeString(a)), answer]
        return {
          id: `${index}-${Date.now()}`,
          question: decodeString(questionItem.question),
          answer: decodeString(questionItem.correct_answer),
          options: options.sort(() => Math.random() - .5)
        }
      }))
    })
  }

  return (
      <div>
         <div className='heading'>
            <h1> Flashcard Quiz </h1>
          </div>
          <form className="header" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="category"> Category </label>
              <select id="category" ref={categoryEl}>
                {categories.map(category => {
                  return <option value={category.id} key={category.id}> {category.name} </option>
                })}
              </select>
            </div>
            <div className="form-group">
              <label className="amount">Number of Questions</label>
              <input type="number" id="amount" min="1" step="1" defaultValue={10} ref={amountEl}></input>
            </div>
            <div className="form-group">
              <button className="bn3637 bn36"> Generate </button>
            </div>
          </form>
          <div className="container">
            <FlashcardList flashcards={flashcards}/>
          </div > 
      </div>
    )
}

export default Home
