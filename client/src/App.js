import { BrowserRouter, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>

      <div className='App'>

        <Route exact path='/' component={LandingPage} />
        
      </div>

    </BrowserRouter>
  )
}

export default App;
