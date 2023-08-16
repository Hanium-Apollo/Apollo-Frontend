import { useNavigate } from "react-router-dom";
import "../../assets/css/deploy.css";
import Button from "../../components/button/Button";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  clientRepoDeleteService,
  getDeployListService,
  serverRepoDeleteService,
} from "../../apis/RepoService";
import { UserInfo } from "../../apis/UserServiceType";
type deployData = {
  repoName: string;
  type: string;
  userId: String;
};
type ListItemProps = {
  deploylist: deployData[];
};

function ListItem({ userId, repoName, type }: deployData) {
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate("/monitor", { state: { repoName } });
  };
  const handleClick = () => {
    if (type === "client") {
      clientRepoDeleteService(userId, repoName)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } else if (type === "server") {
      serverRepoDeleteService(userId, repoName)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
    navigate("/deploy");
  };
  return (
    <div
      style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}
    >
      <li className="list">{repoName}</li>
      {type === "client" ? (
        <button className="selectbtn" onClick={() => handleClick()}>
          삭제
        </button>
      ) : (
        <>
          <button className="deploybtn1" onClick={handleSubmit}>
            모니터링
          </button>
          <button className="deploybtn2" onClick={() => handleClick()}>
            삭제
          </button>
        </>
      )}
    </div>
  );
}

function NumberList({ deploylist }: ListItemProps) {
  const listItems = deploylist.map((item, index) => (
    <ListItem
      key={index.toString()}
      userId={item.userId}
      repoName={item.repoName}
      type={item.type}
    />
  ));
  return (
    <div className="deploylist">
      <ul style={{ padding: "0px" }}>{listItems}</ul>
    </div>
  );
}

function DeployList() {
  const [DeployData, setDeployData] = useState<ListItemProps["deploylist"]>([]);
  const ClientData = useMemo(() => {
    return DeployData.filter((item) => item.type === "client");
  }, [DeployData]);

  const ServerData = useMemo(() => {
    return DeployData.filter((item) => item.type === "server");
  }, [DeployData]);
  const getDeploy = useCallback(() => {
    let info = localStorage.getItem("userInfo");
    let parsedInfo = info ? (JSON.parse(info) as UserInfo) : null;
    let accessToken = localStorage.getItem("token");
    if (!parsedInfo) return;
    let userId = parsedInfo.id;
    if (accessToken && userId) {
      getDeployListService(userId)
        .then((response) => {
          console.log(response.data);
          setDeployData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, []);

  useEffect(() => {
    getDeploy();
  }, [getDeploy]);
  return (
    <div className="deploy">
      <div>
        <div className="name">배포 중 client</div>
        {ClientData !== null && <NumberList deploylist={ClientData} />}
      </div>
      <div>
        <div className="name">배포 중 server</div>
        {ServerData !== null && <NumberList deploylist={ServerData} />}
        <Button css={"fhomebtn"} text={"home"} />
      </div>
    </div>
  );
}

export default DeployList;
