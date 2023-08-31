import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../../assets/images/logoname.png";
import "../../assets/css/Nav.css";
import { UserInfo } from "../../apis/UserServiceType";
import { useCookies } from "react-cookie";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cookie, setCookie, removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  let info = localStorage.getItem("userInfo");
  let parsedInfo = info ? (JSON.parse(info) as UserInfo) : null;
  let userLogin = parsedInfo?.login;
  let userId = parsedInfo?.id;
  let profile = parsedInfo?.avatar_url;
  const HandleLogout = () => {
    localStorage.removeItem("userInfo");
    removeCookie("token");

    navigate("/");
  };
  const GotoMain = () => {
    navigate("/"); // Navigate to another route
  };

  const GotoDeployList = () => {
    navigate("/deploy");
  };
  const GotoMyPage = () => {
    navigate("/mypage");
  };
  const GotoBoard = () => {
    navigate("/board");
  };
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <Link to="/">
        <img src={logo} className="navbar_logo" alt="logo" />
      </Link>
      <div className="dropdown">
        {userId && (
          <>
            <img
              src={profile}
              alt="profile"
              style={{ height: "100%", borderRadius: "50%" }}
            />
            <button className="dropdown-toggle" onClick={toggleDropdown}>
              {userLogin}
            </button>
          </>
        )}

        {isOpen && (
          <ul className="dropdown-menu">
            <li
              className="menu"
              onClick={GotoMain}
              style={{ cursor: "pointer" }}
            >
              Home
            </li>
            <li
              className="menu"
              onClick={GotoBoard}
              style={{ cursor: "pointer" }}
            >
              Board
            </li>
            <li
              className="menu"
              onClick={GotoDeployList}
              style={{ cursor: "pointer" }}
            >
              DeployList
            </li>
            <li
              className="menu"
              onClick={GotoMyPage}
              style={{ cursor: "pointer" }}
            >
              My Page
            </li>
            <li
              className="menu"
              onClick={() => HandleLogout()}
              style={{ cursor: "pointer" }}
            >
              Logout
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Nav;
