import { useState } from 'react'
import { Route , BrowserRouter as Router , Routes } from 'react-router-dom' ;
import Home from './components/Home';
import Auth from './components/AuthPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/auth' element={<Auth />} />
      </Routes>
    </Router>
  )
}

export default App ;
