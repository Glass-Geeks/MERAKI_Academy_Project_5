import "./App.css";
import Err404 from "./components/Error/Err404";
import Nav from "./components/Navbar/Nav";
import { Routes, Route, Link } from "react-router-dom";
function App() {
  return (
    <>
      <Nav />
      <div className="App">
        <Routes>
        <Route path="*" element={<Err404 />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
