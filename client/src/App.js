import './App.css';
import {  Route, Routes, useLocation } from 'react-router-dom'
import Landing from './components/Landing.jsx'
import Home from './components/Home';
import CountryDetails from './components/CountryDetails';
import Activities from './components/Activities'
import About from './components/About';
import Error404 from './components/Error404';
import Nav from './components/Nav';

function App() {
  const location = useLocation();
  return (
    // <BrowserRouter>
    <div>
      
      {location.pathname === '/' ? null : <Nav />} {/* Para no renderizar Nav en /home */}
      <Routes>
        <Route path='/' element={<Landing />}></Route>
        <Route path='/home' element={<Home />} />
        <Route path='/countries/:id' element={<CountryDetails />} />
        <Route path='/activities' element={<Activities />} />
        <Route path='/about' element={<About />} />
        <Route path='*' element={<Error404 />} />
      </Routes>
    </div>
    // </BrowserRouter>
  );
}

export default App;
