import React from 'react';
import './App.css';
import {Admin} from './components/Admin/Admin'
import {Nav} from './components/Nav/Nav'

function App() {
  return (
    <div className="App">
      <Nav />
      <Admin />
    </div>
  );
}

export default App;
