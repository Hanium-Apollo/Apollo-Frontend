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
import { useCookies } from "react-cookie";

type deployData = {
  content: string;
  endpoint: string;
  serviceId: string;
  stackName: string;
  stackType: string;
};
type ItemProps = {
  deploy: deployData;
  userId: string;
};
type ListItemProps = {
  deploylist: deployData[];
  userId: string;
};
function ListItem({ ...props }: ItemProps) {
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate("/monitor", { state: { repoName: props.deploy.stackName } });
  };
  const handleClick = () => {
    if (props.deploy.stackType === "client") {
      clientRepoDeleteService(props.userId, props.deploy.stackName)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } else if (props.deploy.stackType === "server") {
      serverRepoDeleteService(props.userId, props.deploy.stackName)
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
      style={{
        display: "flex",
        alignItems: "center",
        marginBottom: "10px",
      }}
    >
      <li className="list">{props.deploy.stackName}</li>
      {props.deploy.stackType === "client" ? (
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

function NumberList({ deploylist, userId }: ListItemProps) {
  const listItems = deploylist.map((item, index) => (
    <ListItem key={index.toString()} deploy={item} userId={userId} />
  ));
  return (
    <div className="deploylist">
      <ul style={{ padding: "0px" }}>{listItems}</ul>
    </div>
  );
}

function DeployList() {
  const [DeployData, setDeployData] = useState<deployData[]>([]);
  const [cookie] = useCookies(["token"]);
  let info = localStorage.getItem("userInfo");
  let parsedInfo = info ? (JSON.parse(info) as UserInfo) : null;
  const ClientData = useMemo(() => {
    return DeployData.filter((item) => item.stackType === "client");
  }, [DeployData]);

  const ServerData = useMemo(() => {
    return DeployData.filter((item) => item.stackType === "server");
  }, [DeployData]);
  const getDeploy = useCallback(() => {
    let accessToken = cookie.token;
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
  }, [cookie.token, parsedInfo]);

  useEffect(() => {
    getDeploy();
  }, [getDeploy]);
  return (
    <div className="deploy">
      <div>
        <div className="name">배포 중 client</div>
        {ClientData !== null && parsedInfo && (
          <NumberList deploylist={ClientData} userId={parsedInfo?.id} />
        )}
      </div>
      <div>
        <div className="name">배포 중 server</div>
        {ServerData !== null && parsedInfo && (
          <NumberList deploylist={ServerData} userId={parsedInfo?.id} />
        )}
      </div>
      <Button css={"fhomebtn"} text={"home"} />
    </div>
  );
}

export default DeployList;
