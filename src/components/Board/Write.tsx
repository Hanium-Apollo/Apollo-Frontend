import React, { useCallback, useEffect, useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { title } from "process";
import { postBoard } from "../../apis/BoardService";
import { UserInfo } from "../../apis/UserServiceType";
import { useCookies } from "react-cookie";

const Container = styled.div`
  position: absolute;
  max-width: 1440px;
  width: 90vw;
  height: 90vh;
  opacity: 0.75;
  top: 60px;
  left: 50%;
  transform: translate(-50%);
  z-index: 1;
  display: flex;
  flex-direction: column;
  padding: 10px 10px 20px 10px;
  align-items: center;
  justify-content: center;
`;
const Item = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
  flex-direction: row;
`;
const Editor = styled(MDEditor)`
  display: flex;
  width: 100%;
  flex: 10;
`;

const PreviewContainer = styled.div`
  width: 100%; /* Set the width you desire */
`;
const Btn = styled(Button)`
  color: white;
  :hover {
    font-weight: bold;
  }
`;

export const Write = () => {
  const [value, setValue] = useState("");
  const titleRef = React.useRef<HTMLInputElement>(null);
  const tagRef = React.useRef<HTMLInputElement>(null);
  let info = localStorage.getItem("userInfo");
  const parsedInfo = info ? (JSON.parse(info) as UserInfo) : null;
  const userId = parsedInfo?.id;
  const [cookie] = useCookies(["token"]);
  const accessToken = cookie.token;

  const handleEditorChange = (newValue: string | undefined) => {
    if (typeof newValue === "string") {
      setValue(newValue);
      console.log("User input:", newValue); // 콘솔에 사용자 입력값 출력
    }
  };
  const Postpost = useCallback(() => {
    const title = titleRef.current?.value;
    const tagNames = tagRef.current?.value.replace(/ /gi, "").split("#");
    const content = value;
    if (accessToken && userId && title && tagNames && content) {
      postBoard(userId, title, content, tagNames);
    }
  }, [userId, value, accessToken]);
  const handleSubmit = () => {
    Postpost();
  };

  return (
    <Container>
      <Item>
        <div
          style={{
            display: "flex",
            fontSize: "16px",
            color: "white",
            alignItems: "center",
          }}
        >
          제목 :{" "}
        </div>
        <div
          style={{
            flex: "1",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            paddingLeft: "10px",
          }}
        >
          <input
            placeholder="제목을 입력해주세요."
            style={{ width: "100%" }}
            ref={titleRef}
          ></input>
        </div>
      </Item>
      <Item>
        <div
          style={{
            display: "flex",
            fontSize: "16px",
            color: "white",
            alignItems: "center",
          }}
        >
          태그 :{" "}
        </div>
        <div
          style={{
            flex: "1",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            paddingLeft: "10px",
          }}
        >
          <input
            placeholder="제목을 입력해주세요."
            style={{ width: "100%" }}
          ></input>
        </div>
      </Item>
      <Editor value={value} onChange={handleEditorChange} preview="edit" />
      {/* <PreviewContainer>
        <MDEditor.Markdown
          source={value}
          style={{ whiteSpace: "pre-wrap", textAlign: "left" }}
        />
      </PreviewContainer> */}
      <Item
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Btn onClick={handleSubmit}>글쓰기</Btn>
      </Item>
    </Container>
  );
};
