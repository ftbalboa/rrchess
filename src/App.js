import React from 'react';
import './App.css';
import {Admin} from './components/Admin/Admin'
import {Nav} from './components/Nav/Nav'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <Container className="App">
      <Admin />
    </Container>
  );
}

export default App;
