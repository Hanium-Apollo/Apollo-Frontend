import styled from "@emotion/styled";

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  max-width: 1440px;
  width: 100vw;
  background-color: #333333;
  flex-direction: column;
  padding: 20px 0;
  @media (max-width: 768px) {
    padding: 80px 30px;
  }
  overflow-x: hidden;
`;

export default MainContainer;
