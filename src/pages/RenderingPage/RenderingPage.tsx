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
  const startDeploy = useCallback(() => {
    if (repoName && type) {
      console.log("repoName: ", repoName, "is ", type);
      if (type === "client") {
        clientRepoCreateService(repoName)
          .then((response) => {
            console.log("success");
            console.log(response);
            navigate("/success", { state: { repoName } });
          })
          .catch((error) => {
            console.log("error: ", error);
          });
      } else if (type === "server") {
        serverRepoCreateService(repoName)
          .then((response) => {
            console.log("success");
            console.log(response);
            navigate("/success", { state: { repoName } });
          })
          .catch((error) => {
            console.log("error: ", error);
          });
      }
    }
  }, [repoName, type, navigate]);
  useEffect(() => {
    startDeploy();
  }, [startDeploy]);

  return (
    <div className="loading-container">
      <p className="rmessage">WAIT A MINUTE !</p>
      {/* <div className="moving-image"></div> */}
      <div
        style={{
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
