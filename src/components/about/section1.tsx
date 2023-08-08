import React from "react";
import { Grid } from "@mui/material";
import styled from "@emotion/styled";
import { Fade } from "react-awesome-reveal";
import { Section1Inner } from "./section1Inner";

const SectionContainer = styled(Grid)`
  display: flex;
  flex-direction: column;
  background-color: #151515;
  z-index: 1;
  padding: 50px 0 50px 0;
  width: 100vw;
`;

const TextContainer = styled(Grid)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
`;

const Text = styled.div`
  font-size: 200px;
  color: lightgray;
  letter-spacing: 4.8px;
  margin: 15px 0;
  @font-face {
    font-family: "AppleBold";
    src: url("https://cdn.jsdelivr.net/gh/cho1n/Apollo-Frontend@latest/src/assets/fonts/AppleSDGothicNeoEB.ttf")
      format("truetype");
  }
  font-family: "AppleBold";

  span.highlight {
    color: #4cbccc;
  }

  @media (max-width: 600px) {
    font-size: 40px;
  }

  @media (max-width: 1500px) {
    font-size: 120px;
  }
`;

const InnerText = styled.div`
  font-size: 2vw;
  color: lightgray;
  letter-spacing: 4.8px;
  padding: 12px 0;
  @font-face {
    font-family: "Apple";
    src: url("https://cdn.jsdelivr.net/gh/cho1n/Apollo-Frontend@latest/src/assets/fonts/AppleSDGothicNeoB.ttf")
      format("truetype");
  }
  font-family: "Apple";

  @media (max-width: 600px) {
    font-size: 0.8vw;
    padding: 10px 0;
  }

  @media (max-width: 1500px) {
    font-size: 2.5vw;
  }
`;

const SubTitle = styled.div`
  font-size: 3.3vw;
  color: lightgray;
  letter-spacing: 4.8px;
  font-family: "Apple";
  font-weight: bold;

  @media (max-width: 600px) {
    font-size: 3vw;
  }

  @media (max-width: 1500px) {
    font-size: 4vw;
  }
`;

interface Section1Props {
  children: React.ReactNode;
}

export const Section1: React.FC<Section1Props> = ({ children }) => {
  return (
    <SectionContainer>
      <TextContainer item xs={12}>
        <InnerContainer>
          <Fade direction="up">
            <Text>
              {" Let's"}
              <span className="highlight">{" APOLLO "}</span>
            </Text>
            <SubTitle>좀 더 빠르고, 좀 더 안전하게</SubTitle>
            <InnerText> ✓ Github & Docker 이용으로 간편하게 </InnerText>
            <InnerText> ✓ 실시간 모니터링으로 직관적이게</InnerText>
            <InnerText> ✓ 자동화로 한걸음 더 편리하게</InnerText>
          </Fade>
        </InnerContainer>
      </TextContainer>
      <TextContainer item xs={12}>
        <Fade direction="up">
          <Section1Inner children={undefined}></Section1Inner>
        </Fade>
      </TextContainer>
    </SectionContainer>
  );
};
