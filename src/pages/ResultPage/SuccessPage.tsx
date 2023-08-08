// import React, {useState} from "react";
import logo from "../../assets/images/logo.png";
import "../../assets/css/ResultPage.css";
import Button from "../../components/button/Button";
import { useLocation } from "react-router-dom";

function Success() {
  const location = useLocation();
  const repoName = location.state?.repoName;
  return (
    <div className="result">
      <img src={logo} className="logo" alt="logo" />
      <p className="message">LET'S APOLLO !</p>
      <p className="done">배포 성공 !</p>
      <p className="check">모니터링 페이지에서 배포 현황을 확인하세요</p>
      <div>
        <Button css={"shomebtn"} text={"home"} />
        <Button css={"smonitorbtn"} text={"monitor"} state={repoName} />
      </div>
    </div>
  );
}

export default Success;
