import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home.jsx";
import VideogameCreate from "./components/VideogameCreate";
import CardDetail from "./components/CardDetail";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/home/:id" component={CardDetail} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/videogames/create" component={VideogameCreate} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
