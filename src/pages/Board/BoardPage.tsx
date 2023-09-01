import React, { useCallback, useEffect, useState } from "react";
import styled from "@emotion/styled";
import PostList, { PostProps } from "../../components/Board/PostList";
import {
  getBoardList,
  getBoardbyContent,
  getBoardbyTag,
} from "../../apis/BoardService";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

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
  height: 50px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const BottomItem = styled.div`
  display: flex;
  height: 100%;
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
  background-color: gray;
  width: 100px;
  height: 40px;
  font-size: 18px;
  :hover {
    font-weight: bold;
  }
`;
const TabContainer = styled.div`
  width: 100%;
  height: 50px;
  background-color: #151515;
  z-index: 5;
  border-radius: 20px 20px 0px 0px;
  border-bottom: 2px solid gray;
`;

const TabMenu = styled.ul`
  background-color: transparent;
  color: gray;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 7rem;
  margin: 0px;
  display: flex;
  flex-direction: row;

  .submenu {
    display: flex;
    width: 200px;
    padding: 10px;
    font-size: 15px;
    transition: 0.5s;
    cursor: pointer;
    flex: 1;
  }

  .focused {
    font-size: 18px;
    font-weight: bold;
    color: white;
  }

  & div.desc {
    text-align: center;
  }
`;

const Desc = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px;
  text-align: center;
  width: 100%;
  color: #4cbccc;
  -ms-overflow-style: none;
  ::-webkit-scrollbar {
    display: none;
  }
  overflow: auto;
  scrollbehavior: smooth;
`;
const TagBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 5px;
`;
const TagItem = styled.div`
  text-align: center;
  display: grid;
  background-color: gray;
  border-radius: 10px;
  min-width: 50px;
  overflow: auto;
  height: 80%;
  font-size: 12px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 5px 0px 5px;
  cursor: pointer;
`;
export interface TagProps {
  tagId: string;
  tagName: string;
}

export const Board = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [pages, setPages] = useState<number>(1);
  const [tags, setTags] = useState<TagProps[]>([]);
  const [page, setPage] = useState<number>(1);
  const [currentTab, clickTab] = useState(0);
  const [title, setTitle] = useState<string>("");
  const [tag, setTag] = useState<string>("");
  const titleRef = React.useRef<HTMLInputElement>(null);
  const menuArr = [{ name: "Question ✓" }, { name: "Tags (#)" }];
  const selectMenuHandler = (index: number) => {
    clickTab(index);
    if (index === 0) {
      setTitle("");
      setTag("");
    }
  };
  const TagSearch = (tagId: string) => {
    setTitle("");
    setTag(tagId);
    setPage(1);
  };
  const TitleSearch = () => {
    setTag("");
    if (titleRef.current?.value) {
      setTitle(titleRef.current.value);
      setPage(1);
    }
  };

  const GetPost = useCallback(() => {
    if (tag) {
      getBoardbyTag(tag, page).then((res) => {
        setPosts(res.data.posts);
        setPages(Number(res.data.count) / 20 + 1);
      });
    } else if (title) {
      getBoardbyContent(title, page).then((res) => {
        setPosts(res.data.posts);
        setPages(Number(res.data.count) / 20 + 1);
      });
    } else {
      getBoardList(page)
        .then((res) => {
          setPosts(res.data.posts);
          setTags(res.data.tags);
          setPages(Number(res.data.count) / 20 + 1);
        })
        .catch((err) => {});
    }
  }, [tag, title, page]);
  const handlePage = (i: number) => {
    setPage(i);
    GetPost();
  };
  const handleWrite = () => {
    navigate("/board/write");
  };

  useEffect(() => {
    GetPost();
  }, [GetPost]);
  const getPage = () => {
    let pageList = [];
    for (let i = 1; i <= pages; i++) {
      pageList.push(
        <div
          style={{
            display: "flex",
            flex: "1",
            cursor: "pointer",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            fontSize: "15px",
            fontWeight: `${page === i ? "bold" : "normal"}`,
          }}
          onClick={() => handlePage(i)}
        >
          {i}
        </div>
      );
    }
    return pageList;
  };
  const tagItems = tags.map((item, index) => (
    <TagBox>
      <TagItem onClick={() => TagSearch(item.tagId)}>{item.tagName}</TagItem>
    </TagBox>
  ));
  return (
    <Container>
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
          <div
            style={{
              flex: "2.5",
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <input
              placeholder="검색어를 입력해주세요"
              style={{
                display: "flex",
                flex: "1",
                border: "none",
                borderRadius: "20px",
                marginRight: "10px",
                paddingLeft: "5px",
              }}
              ref={titleRef}
            ></input>
            <div style={{ cursor: "pointer" }} onClick={TitleSearch}>
              {" "}
              검색
            </div>
          </div>
        </TabMenu>
      </TabContainer>
      {menuArr[currentTab].name === "Tags (#)" && <Desc>{tagItems}</Desc>}
      {posts && <PostList posts={posts} />}
      <Bottom>
        <BottomItem style={{ flex: "1" }}></BottomItem>
        <BottomItem
          style={{ display: "flex", flexDirection: "row", flex: "3" }}
        >
          {getPage()}
        </BottomItem>
        <BottomButton style={{ flex: "1" }}>
          <Btn onClick={handleWrite}>글쓰기</Btn>
        </BottomButton>
      </Bottom>
    </Container>
  );
};
