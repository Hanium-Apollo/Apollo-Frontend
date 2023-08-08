import styled from "@emotion/styled";

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #333333;
  flex-direction: column;
  margin: 0 auto;
  padding: 20px 0;
  @media (max-width: 768px) {
    padding: 80px 30px;
  }

  width: 100vw;
  overflow-x: hidden;
`;

export default MainContainer;
