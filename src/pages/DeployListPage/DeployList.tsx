import { useNavigate } from "react-router-dom";
import "../../assets/css/deploy.css";
import Button from "../../components/button/Button";

function ListItem(props: any) {
  const navigate = useNavigate();
  const handleSubmit = () => {
    const repoName = props.repoName;
    console.log(props.repoName);
    navigate("/monitor", { state: { repoName } });
  };
  return (
    <div
      style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}
    >
      <li className="list">{props.repoName}</li>
      <button className="selectbtn" onClick={handleSubmit}>
        모니터링
      </button>
    </div>
  );
}

function NumberList(props: any) {
  const numbers = props.numbers;
  const listItems = numbers.map((number: number) => (
    <ListItem key={number.toString()} value={number} />
  ));
  return (
    <div className="deploylist">
      <ul style={{ padding: "0px" }}>{listItems}</ul>
    </div>
  );
}

function DeployList(props: any) {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  return (
    <div className="deploy">
      <div className="name">배포 중인 서비스</div>
      <NumberList numbers={numbers} />
      <Button css={"fhomebtn"} text={"home"} />
    </div>
  );
}

export default DeployList;
