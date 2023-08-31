import styled from "@emotion/styled";
import Post from "./Post";
import { TagProps } from "../../pages/Board/BoardPage";

const ListContainer = styled.div`
  width: 100%;
  flex: 15;
  padding: 20px;
  overflow: auto;
  display: flex;
`;

const List = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(4, 1fr);
  justifycontent: center;
  alignitems: center;
  grid-gap: 10px;
  -ms-overflow-style: none;
  ::-webkit-scrollbar {
    display: none;
  }
  overflow: auto;
  scrollbehavior: smooth;
`;

export interface PostProps {
  title: string;
  createAt: string;
  tags: TagProps[];
  postId: number;
  userLogin: string;
  userId: string;
}
interface PostListProps {
  posts: PostProps[];
}

export const PostList = (props: PostListProps) => {
  const listItems = props.posts.map((item, index) => (
    <Post
      title={item.title}
      createAt={item.createAt}
      tags={item.tags}
      postId={item.postId}
      userLogin={item.userLogin}
      userId={item.userId}
    />
  ));
  return (
    <ListContainer>
      <List>{listItems}</List>
    </ListContainer>
  );
};

export default PostList;
