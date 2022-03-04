import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Main from '../components/Main';
import Game from '../components/Game';
import { Routes, Route } from 'react-router-dom';
import './App.css';

function App() {

  const [operation, setOperation] = useState('x');
  const [maxNumber, setMaxNumber] = useState(10);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route exact path="/" 
          element={<Main operation={operation}
          setOperation={setOperation}
          maxNumber={maxNumber}
          setMaxNumber={setMaxNumber} />} />
        <Route path="/play"
          element={<Game operation={operation}
          maxNumber={maxNumber} />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

/* <Main operation={operation}
      setOperation={setOperation}
      maxNumber={maxNumber}
      setMaxNumber={setMaxNumber} />
      <Game operation={operation}
      maxNumber={maxNumber} /> */
