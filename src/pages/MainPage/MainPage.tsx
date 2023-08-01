import { useEffect, useState, useCallback } from "react";
import logoname from "../../assets/images/logoname.png";
import "../../assets/css/MainPage.css";
import LoginButton from "./components/LoginButton";
import { Button as MaterialButton } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import NumberList from "./components/RepoList";
import { UserInfo } from "../../apis/UserServiceType";
import { getRepoListService } from "../../apis/RepoService";
import Signup from "./components/Signup";
import { getAuthenticationService } from "../../apis/UserService";

const buttonStyles = css`
  background-color: gray;
  padding: 10px 20px;
  border: none;
  border-radius: 1000px;
  position: absolute;
  text-align: center;
  font-weight: bold;
  top: 63.2%;
  right: 5%;
  weight: 19vw;
  height: 5vh;

  @font-face {
    font-family: Inter';
    src: url(../../fonts/Inter-Bold.ttf) format('truetype');
  }

  font-family: 'Inter';
  `;

const StyledButton = styled(MaterialButton)`
  ${buttonStyles}
`;
const Main = () => {
  const navigate = useNavigate();
  const [repoData, setRepoData] = useState([]);
  let info = localStorage.getItem("userInfo");
  let parsedInfo = info ? (JSON.parse(info) as UserInfo) : null;
  let userLogin = parsedInfo?.login;

  const handleCallback = useCallback(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    if (code && localStorage.getItem("action")) {
      console.log(code);
      getAuthenticationService(code)
        .then((res) => {
          console.log(res);
          localStorage.setItem("userInfo", JSON.stringify(res.data));
          navigate("/wait");
        })
        .catch((err) => {
          console.log("here");
          console.log(err);
        });
    } else {
      console.log("Error: code not found");
    }
  }, [navigate]);

  useEffect(() => {
    handleCallback();
  }, [handleCallback]);

  const getRepo = useCallback(() => {
    if (localStorage.getItem("islogin") === 'true' && userLogin) {
      getRepoListService(userLogin)
        .then((response) => {
          console.log(response.data);
          setRepoData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [userLogin]);

  useEffect(() => {
    getRepo();
  }, [getRepo]);

  return (
    <div className="main">
      <img src={logoname} className="logoname" alt="logoname" />
      {localStorage.getItem("islogin") === 'true' ? (
        <>
          <StyledButton
            variant="contained"
            startIcon={<DescriptionIcon />}
            onClick={() => navigate("/about")}
          >
            Learn More..
          </StyledButton>
          {repoData !== null && <NumberList repo={repoData} />}
        </>
      ) : (
        <div>
          <LoginButton />
          <Signup />
        </div>
      )}
    </div>
  );
};

export default Main;
