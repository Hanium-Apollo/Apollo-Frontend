import "./App.css";
import Main from "./pages/MainPage/MainPage";
import Nav from "./pages/Nav/Nav";
import Monitor from "./pages/Monitoring/Monitor";
import About from "./pages/About/About";
import { Register } from "./pages/register/register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NightSky from "./pages/MainPage/NightSky";
import Rendering from "./pages/RenderingPage/RenderingPage";
import Wait from "./pages/Wait/WaitPage";
import DeployList from "./pages/DeployListPage/DeployList";
import { Board } from "./pages/Borad/BoardPage";
import { Write } from "./components/Board/Write";
import { MyPage } from "./pages/MyPage";
import { BoardDetail } from "./pages/Borad/PostPage";
import { Edit } from "./pages/Borad/EditPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/monitor" element={<Monitor />}></Route>
          <Route path="/rendering" element={<Rendering />}></Route>
          <Route path="/About" element={<About />}></Route>
          <Route path="/wait" element={<Wait />}></Route>
          <Route path="deploy" element={<DeployList />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/mypage" element={<MyPage />}></Route>
          <Route path="/board" element={<Board />}></Route>
          <Route path="/board/id" element={<BoardDetail />}></Route>
          <Route path="/board/write" element={<Write />}></Route>
          <Route path="/board/:id/edit" element={<Edit />}></Route>
        </Routes>
        <NightSky />
      </BrowserRouter>
    </div>
  );
}

export default App;
