import { useEffect, useCallback } from "react";
import "../../assets/css/RenderingPage.css";
import { useLocation, useNavigate } from "react-router-dom";
import FadeLoader from "react-spinners/FadeLoader";
import {
  clientRepoCreateService,
  serverRepoCreateService,
} from "../../apis/RepoService";

function Rendering() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state;
  const repoName = state?.repoName;
  const type = state?.type;
  const info = localStorage.getItem("userInfo");
  const userInfo = info ? JSON.parse(info) : null;
  const userId = userInfo.id;
  const startDeploy = useCallback(() => {
    if (repoName && type) {
      if (type === "client") {
        clientRepoCreateService(userId, repoName)
          .then((response) => {
            console.log("success");
            navigate("/deploy");
          })
          .catch((error) => {
            console.log("error: ", error);
          });
      } else if (type === "server") {
        serverRepoCreateService(userId, repoName)
          .then((response) => {
            console.log("success");
            navigate("/deploy");
          })
          .catch((error) => {
            console.log("error: ", error);
          });
      }
    }
  }, [userId, repoName, type, navigate]);
  useEffect(() => {
    startDeploy();
  }, [startDeploy]);

  return (
    <div className="loading-container">
      <p className="rmessage">WAIT A MINUTE !</p>
      <div
        style={{
          marginTop: "10%",
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <FadeLoader color="white" height={15} width={5} radius={2} margin={2} />
      </div>
    </div>
  );
}

export default Rendering;
