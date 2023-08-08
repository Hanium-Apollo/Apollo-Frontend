import "./App.css";
import Main from "./pages/MainPage/MainPage";
import Success from "./pages/ResultPage/SuccessPage";
import Fail from "./pages/ResultPage/FailPage";
import Nav from "./pages/Nav/Nav";
import Monitor from "./pages/Monitoring/Monitor";
import About from "./pages/About/About";
import { Register } from "./pages/register/register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NightSky from "./pages/MainPage/NightSky";
import Rendering from "./pages/RenderingPage/RenderingPage";
import Wait from "./pages/Wait/WaitPage";
import DeployList from "./pages/DeployListPage/DeployList";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/success" element={<Success />}></Route>
          <Route path="/fail" element={<Fail />}></Route>
          <Route path="/monitor" element={<Monitor />}></Route>
          <Route path="/rendering" element={<Rendering />}></Route>
          <Route path="/About" element={<About />}></Route>
          <Route path="/wait" element={<Wait />}></Route>
          <Route path="deploy" element={<DeployList />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
        <NightSky />
      </BrowserRouter>
    </div>
  );
}

export default App;
