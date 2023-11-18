import { BrowserRouter, Routes, Route } from "react-router-dom";

// components
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Radar from "./pages/Radar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/radar" element={<Radar />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
