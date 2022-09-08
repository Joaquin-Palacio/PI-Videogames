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
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/home/:id" element={<CardDetail />} />
          <Route exact path="/videogames/create" element={<VideogameCreate />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
