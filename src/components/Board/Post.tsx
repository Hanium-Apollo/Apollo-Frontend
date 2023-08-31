import styled from "@emotion/styled";
import { PostProps } from "./PostList";
import { useNavigate } from "react-router-dom";
import Tag from "./tag";

const Item = styled.div`
  display: flex;
  width: 100%;
  flex: 1;
  min-height: 150px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  border-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.16);
  border: 1px solid white;
  padding: 7px;
`;

const PostTitle = styled.div`
  display: flex;
  width: 100%;
  flex: 2;
  font-size: 17px;
  font-weight: bold;
  align-items: center;
  color: white;
`;
const PostName = styled.div`
  display: flex;
  width: 100%;
  flex: 1;
  align-items: center;
  font-size: 12px;
  color: white;
`;
const PostContent = styled.div`
  display: flex;
  width: 100%;
  flex: 1;
  align-items: center;
  font-size: 16px;
  color: white;
  flex-direction: row;
  padding: 5px;
`;

const Post = (props: PostProps) => {
  const navigate = useNavigate();
  const date = props.createAt.split("T")[0].split("-").join(".");
  const time = props.createAt
    .split("T")[1]
    .split(".")[0]
    .split(":")
    .slice(0, 2)
    .join(":");
  const createAt = `${date} ${time}`;
  const tagItems = props.tags.map((item, index) => (
    <Tag tagName={item.tagName} tagId={item.tagId} />
  ));
  const GotoDetail = () => {
    navigate(`/board/${props.postId}`);
  };
  return (
    <Item onClick={GotoDetail}>
      <PostTitle>{props.title}</PostTitle>
      <PostName>{props.userLogin}</PostName>
      <PostName>{createAt}</PostName>
      <PostContent>{tagItems}</PostContent>
    </Item>
  );
};
export default Post;
