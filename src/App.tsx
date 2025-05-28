import React from 'react';
import './App.css';
import Header from './components/Header';
import Main from './pages/Main'


function App() {
  return (
     <>
      <div className="bg-[#1d5b39] text-white">
        <Header />
        <Main/>
      </div>
    </>
  );
}

export default App;
