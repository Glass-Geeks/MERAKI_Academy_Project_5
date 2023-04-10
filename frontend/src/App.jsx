import "./App.css";
import Err404 from "./components/Error/Err404";
import { Routes, Route } from "react-router-dom";
import School from "./components/School/School";

function App() {
  return (
    <>
      <div className="App">
        <Routes>
        <Route path="/school/:id" element={<School />} />
        <Route path="*" element={<Err404 />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
