// import React, { useEffect, useRef } from "react";
import "../../assets/css/monitoringPage.css";
import LineShapeChart from "../../components/monitoringChart/LineShapeChart";
import Button from "../../components/button/Button";
import { Container, Grid } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { UserInfo } from "../../apis/UserServiceType";
import React from "react";

export interface DataProps {
  id: string;
  label: string;
  timestamps: string[];
  values: number[];
}

const Monitor = () => {
  const location = useLocation();
  const repoName = location.state?.repoName;
  const serviceId = location.state?.serviceId;
  let info = localStorage.getItem("userInfo");
  let parsedInfo = info ? (JSON.parse(info) as UserInfo) : null;
  let userId = parsedInfo?.id;
  const [Data, setData] = React.useState<DataProps[]>([]);
  useEffect(() => {
    const socket = new WebSocket(
      `${process.env.REACT_APP_SERVER_WEBSOCKET}/api/cloudwatch` +
        `?userId=${userId}&serviceId=${serviceId}`
    );
    socket.addEventListener("open", function (event) {
      console.log("open");
    });
    socket.addEventListener("message", function (event) {
      try {
        const parsedData = JSON.parse(event.data);
        console.log(parsedData);
        setData(parsedData);
      } catch (error) {
        console.error("Error parsing data:", error);
      }
    });
    socket.addEventListener("close", function (event) {
      console.log("close");
    });
    socket.addEventListener("error", function (event) {
      console.log("error");
    });
    return () => {
      socket.close();
    };
  }, [userId, serviceId]);

  useEffect(() => {
    console.log(Data);
  }, [Data]);

  return (
    <div className="monitor">
      <div className="text-block">
        <div className="text">{repoName}</div>
      </div>
      <div className="chart">
        {Data.length > 0 && (
          <Container>
            <Grid container spacing={2}>
              <Grid item xs={6} md={12}>
                <div className="Data-block">
                  {Data[0].label && (
                    <>
                      <div className="NameBlock">{Data[0].label}</div>
                      <LineShapeChart
                        id={Data[0].id}
                        label={Data[0].label}
                        timestamps={Data[0].timestamps}
                        values={Data[0].values}
                      />
                    </>
                  )}
                </div>
              </Grid>
              <Grid item xs={6} md={12}>
                <div className="Data-block">
                  {Data[1].label && (
                    <>
                      <div className="NameBlock">{Data[1].label}</div>
                      <LineShapeChart
                        id={Data[1].id}
                        label={Data[1].label}
                        timestamps={Data[1].timestamps}
                        values={Data[1].values}
                      />
                    </>
                  )}
                </div>
              </Grid>
            </Grid>
          </Container>
        )}
      </div>
      <div>
        <Button css={"mhomebtn"} text={"home"} />
        <Button css={"mbackbtn"} text={"back"} />
      </div>
    </div>
  );
};

export default Monitor;
