import { useParams } from "react-router-dom";
import { getBoardDetail } from "../../apis/BoardService";
import { useCallback, useEffect, useState } from "react";
import PostDetail from "../../components/Board/PostDetail";
import { Container } from "./BoardPage";

export interface PostData {
  userId: string;
  postId: string;
  title: string;
  content: string;
  createdAt: string;
  tag: string[];
}

export interface CommentData {
  commentId: string;
  writerId: string;
  content: string;
  writeAt: string;
}
const examplePost: PostData = {
  userId: "123",
  postId: "456",
  title: "게시물 제목",
  content:
    "게시물 내용입니다.\n```int a = 0;```\n\nafeeawfewf\n\naefewfaewfaew\n\n",
  createdAt: "2023-08-02",
  tag: ["태그1", "태그2"],
};

const exampleComments: CommentData[] = [
  {
    commentId: "1",
    writerId: "user1",
    content: "댓글 1입니다.",
    writeAt: "2023-08-02 10:00:00",
  },
  {
    commentId: "2",
    writerId: "user2",
    content: "댓글 2입니다.",
    writeAt: "2023-08-02 11:00:00",
  },
  {
    commentId: "1",
    writerId: "user1",
    content: "댓글 1입니다.",
    writeAt: "2023-08-02 10:00:00",
  },
  {
    commentId: "2",
    writerId: "user2",
    content: "댓글 2입니다.",
    writeAt: "2023-08-02 11:00:00",
  },
  {
    commentId: "1",
    writerId: "user1",
    content: "댓글 1입니다.",
    writeAt: "2023-08-02 10:00:00",
  },
  {
    commentId: "2",
    writerId: "user2",
    content: "댓글 2입니다.",
    writeAt: "2023-08-02 11:00:00",
  },
  {
    commentId: "1",
    writerId: "user1",
    content: "댓글 1입니다.",
    writeAt: "2023-08-02 10:00:00",
  },
  {
    commentId: "2",
    writerId: "user2",
    content: "댓글 2입니다.",
    writeAt: "2023-08-02 11:00:00",
  },
  {
    commentId: "1",
    writerId: "user1",
    content: "댓글 1입니다.",
    writeAt: "2023-08-02 10:00:00",
  },
  {
    commentId: "2",
    writerId: "user2",
    content: "댓글 2입니다.",
    writeAt: "2023-08-02 11:00:00",
  },
  {
    commentId: "1",
    writerId: "user1",
    content: "댓글 1입니다.",
    writeAt: "2023-08-02 10:00:00",
  },
  {
    commentId: "2",
    writerId: "user2",
    content: "댓글 2입니다.",
    writeAt: "2023-08-02 11:00:00",
  },
  // 추가 댓글 데이터
];
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
      {/* {post && comments && ( */}
      <PostDetail post={examplePost} comments={exampleComments}></PostDetail>
      {/* )} */}
    </Container>
  );
};

export default BoardDetail;
