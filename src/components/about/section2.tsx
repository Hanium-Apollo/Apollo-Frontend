import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import styled from "@emotion/styled";

const SectionContainer = styled(Grid)`
  display: flex;
  flex: 1;
  position: absolute;
  max-width: 1440px;
  background-color: #2C2C2C;
  z-index: 1;
  justify-content: center;
  align-items: center;
  padding: 80px;
  width: 100vw;
  text-align: center;
`;

const Text = styled.div`
  margin: 0 auto;
  color: lightgray;
  font-weight: 700;
  line-height: 1.8;
  letter-spacing: -1px;
  font-size: 80px;

  @font-face {
    font-family: "AppleBold";
    src: url("https://cdn.jsdelivr.net/gh/cho1n/Apollo-Frontend@latest/src/assets/fonts/AppleSDGothicNeoB.ttf")
      format("truetype");
  }

  font-family: "AppleBold";

  span.highlight {
    color: #4cbccc;
  }

  @media (max-width: 600px) {
    font-size: 15px;
  }

  @media (max-width: 1500px) {
    font-size: 60px;
  }
`;

const Scroll = styled.div`
  .show {
    opacity: 1;
  }

  .hide {
    opacity: 0.3;
  }
`;
interface Section2Props {
  children: React.ReactNode;
}

export const Section2: React.FC<Section2Props> = ({ children }) => {
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = () => {
    const scrollPosition = window.pageYOffset;
    setScrollY(scrollPosition);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  console.log(scrollY);

  return (
    <SectionContainer container xs id="how">
      <Scroll>
        <Text className={1000 < scrollY && scrollY < 1100 ? "show" : "hide"}>
          전례없던 <span className="highlight">{" 배포 "}</span>서비스.
        </Text>
        <Text className={1100 < scrollY && scrollY < 1200 ? "show" : "hide"}>
          뛰어난 안정성으로 자식같은 서비스를 안전하게.
        </Text>
        <Text className={1200 < scrollY && scrollY < 1300 ? "show" : "hide"}>
          걱정할 필요없는 비용문제.
        </Text>
        <Text className={1300 < scrollY && scrollY < 1400 ? "show" : "hide"}>
          메이저 개발 언어 모두를 포용하는 편리함.
        </Text>
        <Text className={1400 < scrollY && scrollY < 1500 ? "show" : "hide"}>
          모니터링 페이지를 통해 배포 상황 실시간 확인까지.
        </Text>
      </Scroll>
    </SectionContainer>
  );
};
