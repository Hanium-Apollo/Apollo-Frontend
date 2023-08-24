import { useParams } from "react-router-dom";
import { getBoardDetail } from "../../apis/BoardService";
import { useCallback, useEffect, useState } from "react";
import PostDetail from "../../components/Board/PostDetail";
import { Container, TagProps } from "./BoardPage";

export interface PostData {
  userId: string;
  postId: string;
  title: string;
  content: string;
  createdAt: string;
  tag: TagProps[];
}

export interface CommentData {
  commentId: string;
  writerId: string;
  content: string;
  writeAt: string;
}

export const BoardDetail = () => {
  const Id = useParams().id;
  const [post, setPost] = useState<PostData>();
  const [comments, setComments] = useState<CommentData[]>([]);
  const getPost = useCallback(() => {
    if (Id) {
      getBoardDetail(Id)
        .then((response) => {
          setPost(response.data.post);
          setComments(response.data.comments);
        })
        .catch((error) => {});
    }
  }, [Id]);
  useEffect(() => {
    getPost();
  }, [Id, getPost]);

  return (
    <Container>
      {post && comments && (
        <PostDetail post={post} comments={comments}></PostDetail>
      )}
    </Container>
  );
};

export default BoardDetail;