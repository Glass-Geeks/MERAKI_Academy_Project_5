import "./App.css";
import Register from "./components/Register/Register";
import Err404 from "./components/Error/Err404";
import MapContainer from "./components/Map/Map";
import { Routes, Route } from "react-router-dom";
import School from "./components/School/School";
import Login from "./components/Login/Login";
import Friends from "./components/Friends/Friends";
import Conversation from "./components/conversation/Conversation";

function App() {
  console.log('process.env.REACT_APP_API_LINK :>> ', process.env.REACT_APP_API_LINK);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MapContainer />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/school/:id" element={<School />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/friends/:id" element={<Conversation />} />
        <Route path="*" element={<Err404 />} />
      </Routes>
    </div>
  );
}

export default App;
