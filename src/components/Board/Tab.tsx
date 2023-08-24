import styled from "@emotion/styled";
import { useState } from "react";

const TabContainer = styled.div`
  width: 100%;
  height: 50px;
  background-color: #151515;
  z-index: 5;
  border-radius: 20px 20px 0px 0px;
  border-bottom: 2px solid #4cbccc;
`;

const TabMenu = styled.ul`
  background-color: transparent;
  color: rgb(232, 234, 237);
  font-weight: bold;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 7rem;
  margin: 0px;

  .submenu {
    display: flex;
    width: 200px;
    padding: 10px;
    font-size: 15px;
    transition: 0.5s;
    cursor: pointer;
  }

  .focused {
    font-size: 18px;
    font-weight: bold;
    color: #4cbccc;
  }

  & div.desc {
    text-align: center;
  }
`;

const Desc = styled.div`
  text-align: center;
  width: 100%;
  color: #4cbccc;
`;

export const Tab = () => {
  const [currentTab, clickTab] = useState(0);

  const menuArr = [
    { name: "Question ✓", content: "" },
    { name: "Tags (#)", content: "태그 목록" },
  ];
  const selectMenuHandler = (index: number) => {
    clickTab(index);
  };

  return (
    <>
      <TabContainer>
        <TabMenu>
          {menuArr.map((el, index) => (
            <li
              className={index === currentTab ? "submenu focused" : "submenu"}
              onClick={() => selectMenuHandler(index)}
            >
              {el.name}
            </li>
          ))}
        </TabMenu>
        <Desc>
          <p>{menuArr[currentTab].content}</p>
        </Desc>
      </TabContainer>
    </>
  );
};
