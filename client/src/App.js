import './App.css';
import {BrowserRouter, Route} from 'react-router-dom'
import LandingPage from './components/Landingpage';
import Home from './components/Home.jsx';
import VideogameCreate from './components/VideogameCreate'
import DetailVideogame from './components/DetailVideogame';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
          <Route exact path= '/' component={LandingPage} />
          <Route exact path= '/home' component={Home} />
          <Route exact path= '/videogame' component={VideogameCreate} />
          <Route exact path= '/home/:id' component={DetailVideogame} />
      </div>
    </BrowserRouter>
  );
}

export default App;
