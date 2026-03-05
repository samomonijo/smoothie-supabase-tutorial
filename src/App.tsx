import { BrowserRouter, Routes, Route, Link } from "react-router";

// pages
import Home from "./pages/Home";
import Create from "./pages/Create";
import Update from "./pages/Update";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <h1>Supa Smoothies</h1>
        <Link to="/" className="underline">Home</Link>
        <Link to="/create" className="underline">Create New Smoothie</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/:id" element={<Update />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;