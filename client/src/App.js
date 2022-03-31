import './App.css';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import NotFound from './pages/NotFound';
import Home from './components/Home/Home';
import HeroPage from './components/Hero/HeroPage/HeroPage';
import logo from './assets/images/logo.svg'

function App() {
  return (
    <div className="App">
      <Router>
        <div className="App__header">
          <Link className="App_header__wrapper" to="/">
            <img className="logo" src={logo}/>
            <h2 >SuperHero App</h2>
            <img className="logo" src={logo}/>
          </Link>
        </div>
        <Routes>

          <Route path="/" element={<Home />}/>
          <Route path="/heroes" element={<Home />}/>
          <Route path="/heroes/:id" element={<HeroPage />}/>
          <Route path="*" element={<NotFound />}/>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
