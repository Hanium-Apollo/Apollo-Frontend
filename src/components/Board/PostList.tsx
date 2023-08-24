import styled from "@emotion/styled";
import Post from "./Post";

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
  nickname: string;
  title: string;
  createdAt: string;
  tag: string[];
  postId: number;
}
interface PostListProps {
  posts: PostProps[];
}

export const PostList = ({ ...props }: PostListProps) => {
  const listItems = props.posts.map((item, index) => (
    <Post
      nickname={item.nickname}
      title={item.title}
      createdAt={item.createdAt}
      tag={item.tag}
      postId={item.postId}
    />
  ));
  return (
    <ListContainer>
      <List>{listItems}</List>
    </ListContainer>
  );
};

export default PostList;
