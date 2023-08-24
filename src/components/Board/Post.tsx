import styled from "@emotion/styled";
import { PostProps } from "./PostList";
import { useNavigate } from "react-router-dom";

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
const TagBox = styled.div`
  display: flex;
  height: 100%;
  flex: 1;
  align-items: center;
  justify-content: center;
`;
const Tag = styled.div`
  text-align: center;
  display: grid;
  background-color: #4cbccc;
  border-radius: 10px;
  width: 80%;
  height: 80%;
  font-size: 12px;
  color: white;
  align-items: center;
`;

const Post = ({ ...props }: PostProps) => {
  const navigate = useNavigate();
  const tagItems = props.tag.map((item, index) => (
    <TagBox>
      <Tag>{item}</Tag>
    </TagBox>
  ));
  const GotoDetail = () => {
    navigate(`/board/${props.postId}`);
  };
  return (
    <Item onClick={GotoDetail}>
      <PostTitle>{props.title}</PostTitle>
      <PostName>{props.nickname}</PostName>
      <PostName>{props.createdAt}</PostName>
      <PostContent>{tagItems}</PostContent>
    </Item>
  );
};
export default Post;
