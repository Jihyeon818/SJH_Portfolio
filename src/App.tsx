import React from 'react';
import './App.css';
import Header from './components/Header';
import Main from './pages/Main'


function App() {
  return (
     <>
      <div className="bg-[#155c87] text-white">
        <Header />
        <Main/>
      </div>
    </>
  );
}

export default App;
