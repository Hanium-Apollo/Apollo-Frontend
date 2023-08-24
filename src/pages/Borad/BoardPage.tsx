import React, { useCallback, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Tab } from "../../components/Board/Tab";
import PostList, { PostProps } from "../../components/Board/PostList";
import { getBoardList } from "../../apis/BoardService";
import { Button } from "@mui/material";

export const Container = styled.div`
  position: absolute;
  max-width: 1440px;
  width: 90vw;
  height: 90vh;
  background-color: #151515;
  opacity: 0.75;
  border-radius: 20px;
  top: 60px;
  left: 50%;
  transform: translate(-50%);
  z-index: 1;
  display: flex;
  flex-direction: column;
  padding: 10px 10px 20px 10px;
`;
const Bottom = styled.div`
  display: flex;
  width: 100%;
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const BottomItem = styled.div`
  display: flex;
  height: 100%;
  flex: 1;
  align-items: center;
  justify-content: center;
  color: white;
`;
const BottomButton = styled.div`
  display: flex;
  height: 100%;
  flex: 1;
  align-items: center;
  justify-content: flex-end;
  padding-right: 20px;
`;
const Btn = styled(Button)`
  color: whitesmoke;
  cursor: pointer;
  background-color: #4cbccc;
  width: 100px;
  height: 40px;
  font-size: 18px;
  :hover {
    font-weight: bold;
  }
`;

export const Board = () => {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const GetPost = useCallback(() => {
    getBoardList()
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {});
  }, []);

  useEffect(() => {
    GetPost();
  }, [GetPost]);
  return (
    <Container>
      <Tab />
      <PostList posts={posts} />
      <Bottom>
        <BottomItem></BottomItem>
        <BottomItem>1</BottomItem>
        <BottomButton>
          <Btn>글쓰기</Btn>
        </BottomButton>
      </Bottom>
    </Container>
  );
};
