import React from "react";
import { Grid } from "@mui/material";
import styled from "@emotion/styled";
import Description1 from "../../assets/images/Untitled.png";
import Description2 from "../../assets/images/Untitled (1).png";
import Description3 from "../../assets/images/Untitled (2).png";
import Description4 from "../../assets/images/Untitled (3).png";
import Description5 from "../../assets/images/Untitled (4).png";
import Description6 from "../../assets/images/Untitled (5).png";
import Description7 from "../../assets/images/Untitled (6).png";
import Description8 from "../../assets/images/Untitled (7).png";
import Description9 from "../../assets/images/Untitled (8).png";

const SectionContainer = styled(Grid)`
  display: flex;
  position: absolute;
  flex: 1;
  max-width: 1440px;
  background-color: #2c2c2c;
  z-index: 1;
  padding: 50px;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  transform: translate(0, 0);
`;

const Text = styled.div`
  font-size: 24px;
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

  span.highlight {
    color: #4cbccc;
  }
  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

const SectionInner = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  white-space: nowrap;
  padding: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid lightgray;
`;

interface Section4Props {
  children: React.ReactNode;
}

export const Section4: React.FC<Section4Props> = ({ children }) => {
  return (
    <SectionContainer container xs id="iam">
      <Text>{" IAM 이란 ? "}</Text>
      <Text>{"IAM은 AWS Identity and Access Management의 약자로, "}</Text>
      <Text>
        {
          "사용자 및 그룹을 만들어서 AWS 리소스에 대한 액세스를 안전하게 제어할 수 있는 웹 서비스입니다."
        }
      </Text>
      <Text>
        <span className="highlight">{"Apollo"}</span>
        {"는 AWS 계정 연동을 위해 IAM을 사용합니다."}
      </Text>
      <SectionInner>
        <Text>
          <span className="highlight">{"1. "}</span>
          {"상단의 계정 아이디를 클릭하여 [계정]을 클릭"}
        </Text>
        <Text>
          {
            "그 후 아래 결제 정보에 대한 IAM 사용자 및 역할 액세스 에서 편집 클릭 → 엑세스 활성화 "
          }
        </Text>
        <img src={Description1} alt="" height={"500px"} width={"1000px"}></img>
      </SectionInner>
      <SectionInner>
        <Text>
          <span className="highlight">{"2. "}</span>
          {"상단의 검색창에서 IAM 검색"}
        </Text>
        <img src={Description2} alt="" width={"1000px"}></img>
      </SectionInner>
      <SectionInner>
        <Text>
          <span className="highlight">{"3. "}</span>
          {"[사용자] - [사용자 생성]"}
        </Text>
        <img src={Description3} alt="" width={"1000px"}></img>
        <img src={Description4} alt="" width={"1000px"}></img>
      </SectionInner>
      <SectionInner>
        <Text>
          <span className="highlight">{"4. "}</span>
          {"그룹 생성 클릭"}
        </Text>
        <img
          src={Description5}
          alt=""
          width={"1000px"}
          style={{ marginBottom: "20px" }}
        ></img>
        <img src={Description6} alt="" width={"1000px"}></img>
      </SectionInner>
      <SectionInner>
        <Text>
          <span className="highlight">{"5. "}</span>
          {"AdministratorAccess 선택"}
        </Text>
        <img
          src={Description7}
          alt=""
          width={"1000px"}
          style={{ marginBottom: "20px" }}
        ></img>
        <img src={Description8} alt="" width={"1000px"}></img>
      </SectionInner>
      <SectionInner>
        <Text>
          <span className="highlight">{"6. "}</span>
          {"사용자생성 클릭"}
        </Text>
        <Text>
          {
            ".csv 파일을 열게 되면 IAM 사용자 명, 콘솔 로그인 url, 비밀번호를 모두 확인할 수 있다. "
          }
        </Text>
        <img src={Description9} alt="" width={"1000px"}></img>
      </SectionInner>
    </SectionContainer>
  );
};
