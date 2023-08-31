import React from "react";
import { Grid } from "@mui/material";
import MainContainer from "../../components/about/MainContainer";
import { Section1 } from "../../components/about/section1";
import { Section2 } from "../../components/about/section2";
import { Section3 } from "../../components/about/section3";
import { Section4 } from "../../components/about/section4";

const About: React.FC = () => {
  return (
    <MainContainer>
      <Grid item xs={6} md={24}>
        <Section1 children={undefined}></Section1>
      </Grid>
      <Grid item xs={6} md={24}>
        <Section2 children={undefined}></Section2>
      </Grid>
      <Grid item xs={6} md={24}>
        <Section3 children={undefined}></Section3>
      </Grid>
      <Grid item xs={6} md={24}>
        <Section4 children={undefined}></Section4>
      </Grid>
    </MainContainer>
  );
};

export default About;
