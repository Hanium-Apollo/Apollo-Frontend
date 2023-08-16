import { useNavigate } from "react-router-dom";
import {
  postUserSignInService,
  postUserSignUpService,
} from "../../apis/UserService";
import { useCallback, useEffect, useState } from "react";
import FadeLoader from "react-spinners/FadeLoader";
import { apiClient } from "../../apis/ApiClient";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "@emotion/styled";
import { UserInfo } from "../../apis/UserServiceType";
import { useCookies } from "react-cookie";

export const StyledToastContainer = styled(ToastContainer)`
  .Toastify__toast {
    background-color: gray;
    color: white;
    font-weight: bold;
    border-radius: 10px;
    font-size: 30px;
    display: inline-block;
    padding: 20px 40px 20px 40px;
    white-space: nowrap;
  }
`;

const Wait = () => {
  const navigate = useNavigate();
  const action = localStorage.getItem("action");
  const [isFinish, SetFinish] = useState("");
  const [parsedInfo, SetParsedInfo] = useState<UserInfo | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cookies, setCookie] = useCookies(["token"]); // cookies와 setCookie 추가

  useEffect(() => {
    const info = localStorage.getItem("userInfo");
    const infoParsed = info ? (JSON.parse(info) as UserInfo) : null;

    SetParsedInfo(infoParsed);
  }, []);

  const handleLogin = useCallback(() => {
    if (action === "userSignUp" && parsedInfo) {
      postUserSignUpService(parsedInfo)
        .then((response) => {
          console.log("success");
          console.log(response);
          localStorage.removeItem("action");
          localStorage.removeItem("userInfo");
          SetFinish("signup");
          return "success";
        })
        .catch((error) => {
          console.log("error: ", error);
          alert("에러가 발생했습니다: " + error.response);
          navigate("/");
        });
    } else if (action === "userSignIn" && parsedInfo) {
      postUserSignInService(parsedInfo.login, parsedInfo.id)
        .then((response) => {
          console.log("success");
          console.log(response);
          apiClient.defaults.headers.common[
            "auth"
          ] = `Bearer ${response.data.result.accessToken}`;
          setCookie("token", response.data.result.accessToken, {
            path: "/",
            expires: new Date(Date.now() + 3 * 60 * 60 * 1000),
          });
          localStorage.removeItem("action");
          SetFinish("signin");
          return response.data;
        })
        .catch((error) => {
          console.log(error.response.data);
          alert("에러가 발생했습니다: " + error.response);
          navigate("/");
          return error;
        });
    }
  }, [action, parsedInfo, navigate, setCookie]);
  useEffect(() => {
    const notify = (message: string) =>
      toast(message, {
        onClose: () => navigate("/"),
      });
    handleLogin();
    if (isFinish === "signup") {
      navigate("/register", {
        state: { userId: parsedInfo?.id },
      });
    } else if (isFinish === "signin") {
      notify("로그인이 완료되었습니다.");
    }
  }, [handleLogin, isFinish, navigate, parsedInfo]);

  return (
    <>
      <StyledToastContainer
        position="top-center"
        limit={1}
        closeOnClick
        autoClose={3000}
        hideProgressBar
        pauseOnHover
        closeButton={false}
      />
      <div className="contentWrap">
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <FadeLoader
            color="white"
            height={15}
            width={5}
            radius={2}
            margin={2}
          />
        </div>
      </div>
    </>
  );
};

export default Wait;
