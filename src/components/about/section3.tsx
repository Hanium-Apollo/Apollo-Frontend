import React from "react";
import { Grid } from "@mui/material";
import styled from "@emotion/styled";
import Docker_py from "../../assets/images/Docker_Py.png";
import Docker_node from "../../assets/images/Docker_node.png";
import Docker_go from "../../assets/images/Docker_go.png";
import Docker_java from "../../assets/images/Docker_java.png";

const SectionContainer = styled(Grid)`
  display: flex;
  flex: 1;
  max-width: 1440px;
  background-color: #313131;
  z-index: 1;
  padding: 50px;
  width: 100%;
  align-items: center;
  justify-content: center;
  transform: translate(0, 0);
`;

const Text = styled.div`
  font-size: 25px;
  color: lightgray;
  letter-spacing: 4.8px;
  font-weight: bold;
  margin: 30px 0;
  @font-face {
    font-family: "One";
    src: url("https://cdn.jsdelivr.net/gh/cho1n/Apollo-Frontend@latest/src/assets/fonts/ONE-Mobile-Regular.ttf")
      format("truetype");
  }
  font-family: "One";

  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

const Section3Inner = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  padding: 20px;
`;

interface Section3Props {
  children: React.ReactNode;
}

export const Section3: React.FC<Section3Props> = ({ children }) => {
  return (
    <SectionContainer container xs id="docker">
      <Grid item xs={12}>
        <Text>
          {
            "Apollo는 더 안전하고 편리한 배포 서비스를 위해 Docker & AWS 사용을 권장합니다."
          }
        </Text>
        <Text>
          {"언어별 Dockerfile 작성법을 보고 싶으시다면 아래를 참고해주세요 ! "}
        </Text>
        <Section3Inner>
          <img src={Docker_py} alt="" width={"800px"} />
          <Text>{" Python 배포시 Dockerfile 작성요령 "}</Text>
        </Section3Inner>
        <Section3Inner>
          <Text>{" Node.js 배포시 Dockerfile 작성요령 "}</Text>
          <img src={Docker_node} alt="" width={"800px"} />
        </Section3Inner>
        <Section3Inner>
          <img src={Docker_go} alt="" width={"800px"} />
          <Text>{" Go 배포시 Dockerfile 작성요령 "}</Text>
        </Section3Inner>
        <Section3Inner>
          <Text>{" Java 배포시 Dockerfile 작성요령 "}</Text>
          <img src={Docker_java} alt="" height={"500px"} width={"800px"} />
        </Section3Inner>
      </Grid>
    </SectionContainer>
  );
};
