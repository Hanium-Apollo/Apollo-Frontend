// import React, { useEffect, useRef } from "react";
import "../../assets/css/monitoringPage.css";
import BarShapeChart from "../../components/monitoringChart/BarShapeChart";
import LineShapeChart from "../../components/monitoringChart/LineShapeChart";
import Button from "../../components/button/Button";
import { Container, Grid } from "@mui/material";
import { useLocation } from "react-router-dom";
function Monitor() {
  const location = useLocation();
  const repoName = location.state?.repoName;
  return (
    <div className="monitor">
      <div className="text-block">{repoName}</div>
      <div className="chart">
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={6} md={12}>
              <div className="cpu-block">
                <div className="NameBlock">CPU Utilization</div>
                <LineShapeChart />
              </div>
            </Grid>
            <Grid item xs={6} md={12}>
              <div className="log-block">
                <div className="NameBlock">Log Check</div>
                <BarShapeChart />
              </div>
            </Grid>
          </Grid>
        </Container>
      </div>
      <div>
        <Button css={"mhomebtn"} text={"home"} />
        <Button css={"mbackbtn"} text={"back"} />
      </div>
    </div>
  );
}

export default Monitor;
