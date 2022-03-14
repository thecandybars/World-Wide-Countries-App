import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Landing from './components/Landing.jsx'
import Home from './components/Home';
import CountryDetails from './components/CountryDetails';
import Activities from './components/Activities'
import Nav from './components/Nav';
import About from './components/About';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing />}></Route>
        <Route path='/home' element={<Home/>} />
        <Route path='/countries/:id' element={<CountryDetails/> } />
        <Route path='/activities' element={<Activities/> } />
        <Route path='/about' element={<About/> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
