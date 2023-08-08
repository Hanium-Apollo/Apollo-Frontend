import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../../assets/images/logoname.png";
import "../../assets/css/Nav.css";
import { UserInfo } from "../../apis/UserServiceType";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  let info = localStorage.getItem("userInfo");
  let parsedInfo = info ? (JSON.parse(info) as UserInfo) : null;
  let accessToken = localStorage.getItem("token");
  let userLogin = parsedInfo?.login;
  let profile = parsedInfo?.avatar_url;
  const HandleLogout = () => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("token");
    window.location.href = "/";
  };
  const GotoMain = () => {
    navigate("/"); // Navigate to another route
  };

  const GotoFail = () => {
    navigate("/fail");
  };
  const GotoSuccess = () => {
    navigate("/success");
  };
  const GotoDeployList = () => {
    navigate("/deploy");
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
        {accessToken && (
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
              onClick={GotoFail}
              style={{ cursor: "pointer" }}
            >
              Fail
            </li>
            <li
              className="menu"
              onClick={GotoSuccess}
              style={{ cursor: "pointer" }}
            >
              Success
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
