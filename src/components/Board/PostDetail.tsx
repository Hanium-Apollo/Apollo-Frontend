import styled from "@emotion/styled";
import { CommentData, PostData } from "../../pages/Board/PostPage";
import CommentList from "./CommentList";
import { useRef } from "react";
import { deleteBoard, postComment } from "../../apis/BoardService";
import { useNavigate } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import { UserInfo } from "../../apis/UserServiceType";
import Tag from "./tag";

export const ScrollContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  color: white;
  overflow: auto;
`;
export const ScrollContainer = styled.div`
  width: 100%;
  display: block;
  paadding: 20px;
  flex: 1;
  overflow: auto;
  -ms-overflow-style: none;
  ::-webkit-scrollbar {
    display: none;
  }
  scroll-behavior: smooth;
`;
interface PostDetailProps {
  post: PostData;
  comments: CommentData[];
}

export const PostDetail = (prop: PostDetailProps) => {
  const navigate = useNavigate();
  const date = prop.post.createAt.split("T")[0].split("-").join(".");
  const time = prop.post.createAt
    .split("T")[1]
    .split(".")[0]
    .split(":")
    .slice(0, 2)
    .join(":");
  const createAt = `${date} ${time}`;
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const number = prop.comments.length;
  let info = localStorage.getItem("userInfo");
  const parsedInfo = info ? (JSON.parse(info) as UserInfo) : null;
  const userId = parsedInfo?.id;
  const setComment = async (content: string) => {
    if (userId) {
      await postComment(userId, prop.post.postId, content);
      console.log("success");
    }
  };
  const handleComment = () => {
    const content = inputRef.current?.value;
    if (content) {
      setComment(content);
      window.location.reload();
    }
  };
  const handleDelete = async () => {
    if (userId) {
      await deleteBoard(prop.post.postId, userId);
      navigate("/board");
    }
  };
  const handleEdit = () => {
    if (userId) {
      navigate(`/board/${prop.post.postId}/edit`);
    }
  };
  const tagItems = prop.post.tags.map((item, index) => (
    <Tag tagName={item.tagName} tagId={item.tagId} />
  ));

  return (
    <ScrollContent>
      <ScrollContainer>
        <div
          style={{
            width: "100%",
            marginBottom: "10px",
            display: "flex",
            alignItems: "center",
          }}
        >
          {tagItems}
        </div>
        <div
          style={{
            width: "100%",
            marginBottom: "10px",
            fontSize: "12px",
            display: "flex",
            alignItems: "center",
          }}
        >
          {prop.post.userLogin}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            marginBottom: "5px",
          }}
        >
          <div
            style={{
              flex: "1",
              fontSize: "18px",
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            {prop.post.title}
          </div>
          {prop.post.userId === userId && (
            <div
              style={{ flex: "1", display: "flex", justifyContent: "flex-end" }}
            >
              <div style={{ cursor: "pointer" }} onClick={handleEdit}>
                수정하기
              </div>
              /
              <div style={{ cursor: "pointer" }} onClick={handleDelete}>
                삭제하기
              </div>
            </div>
          )}
        </div>
        <div
          style={{
            width: "100%",
            fontSize: "12px",
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          {createAt}
        </div>
        <div
          style={{
            width: "100%",
            paddingTop: "20px",
            paddingBottom: "20px",
            borderBottom: "1px solid #B7BBC8",
          }}
        >
          <div
            style={{
              width: "100%",
              padding: "10px",
              whiteSpace: "pre-wrap",
              fontSize: "16px",
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <MDEditor.Markdown
              source={prop.post.content}
              style={{
                whiteSpace: "pre-wrap",
                textAlign: "left",
                width: "100%",
                minHeight: "100px",
              }}
            />
          </div>
        </div>
        <div
          style={{
            height: "25px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            margin: "14px 10px 20px 10px",
          }}
        >
          <div
            style={{
              height: "25px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                cursor: "pointer",
                display: "flex",
                placeItems: "center",
              }}
            ></div>
            <div
              style={{
                margin: "8px",
                fontSize: "16px",
                fontFamily: "MainFont",
              }}
            >
              댓글 {number}
            </div>
          </div>
        </div>
        <CommentList comments={[...prop.comments]} />
      </ScrollContainer>
      <div style={{ width: "100%" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "10px 0px 10px 0px",
            height: "auto",
            borderTop: "1px solid #B7BBC8",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              padding: "15px 20px 15px 20px",
              border: "1px solid #B7BBC8",
              borderRadius: "10px",
              height: "auto",
              fontSize: "16px",
            }}
          >
            <textarea
              placeholder="댓글을 남겨보세요"
              style={{
                border: "none",
                resize: "none",
                overflow: "hidden",
                outline: "none",
                minHeight: "60px",
                scrollBehavior: "smooth",
                marginTop: "10px",
                fontSize: "14px",
                fontFamily: "MainFont",
              }}
              ref={inputRef}
            />
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              paddingTop: "10px",
            }}
          >
            <button
              style={{
                border: "none",
                borderRadius: "10px",
                backgroundColor: "#B7BBC8",
                width: "38px",
                height: "30px",
                fontSize: "14px",
                cursor: "pointer",
                boxShadow: "0px 4px 5px rgba(0, 0, 0, 0.4)",
              }}
              onClick={handleComment}
            >
              등록
            </button>
          </div>
        </div>
      </div>
    </ScrollContent>
  );
};

export default PostDetail;
