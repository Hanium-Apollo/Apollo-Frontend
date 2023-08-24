import React from "react";
import styled from "@emotion/styled";
import { Fade } from "react-awesome-reveal";
import { Grid, Button as MaterialButton } from "@mui/material";
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-scroll";

const SectionContainer = styled(Grid)`
  display: flex;
  flex: 1;
  position: absolute;
  left: 0;
  top: 0;
  flex-direction: column;
  background-color: #313131;
  z-index: 3;
  padding: 60px;
  width: 100vw;
  justify-content: center;
  
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

const buttonStyles = css`
  background-color: #e1e1e1;
  padding: 20px 20px;
  color: #151515;
  font-weight: bold;
  font-size: 1.3vw;
  border: 1px;
  weight: 50vw;
  height: 7vh;
  display: flex;
  border-radius: 10px;

  @font-face {
    font-family: "AppleBold";
    src: url("https://cdn.jsdelivr.net/gh/cho1n/Apollo-Frontend@latest/src/assets/fonts/AppleSDGothicNeoB.ttf")
      format("truetype");
  }
  font-family: "AppleBold";

  @media (max-width: 768px) {
    font-size: 0.4vw;
  }

  @media (max-width: 1280px) {
    font-size: 1.3vw;
  }
`;

const StyledButton = styled(MaterialButton)`
  ${buttonStyles}
`;

const ButtonContainer = styled(Grid)`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 20px 10px 20px;
    padding: 20px 20px 20px 20px;

    & > *:not(:last-child) {
        margin-right: 100px; 
    }

    @media (max-width: 768px) {
        & > *:not(:last-child) {
            margin-right: 10px; /* 화면이 768px 이하일 때 간격을 줄입니다.
    }
}
`;

interface Section1Props {
  children: React.ReactNode;
}

export const Section1: React.FC<Section1Props> = ({ children }) => {
  const navigate = useNavigate();

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
      <ButtonContainer item xs={12}>
        <Fade direction="up">
          <StyledButton onClick={() => navigate("/")} size="large">
            {"Get Started 👌🏼"}
          </StyledButton>

          <Link to="how" spy={true} smooth="true">
            <StyledButton variant="text">{"Apollo ? 🤔"}</StyledButton>
          </Link>

          <Link to="docker" spy={true} smooth="true">
            <StyledButton>{"If No Dockerfile 🐳"}</StyledButton>
          </Link>
        </Fade>
      </ButtonContainer>
    </SectionContainer>
  );
};
