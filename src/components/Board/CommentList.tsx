import { CommentData } from "../../pages/Board/PostPage";
import Comment from "./Comment";
export interface CommentListProps {
  comments: CommentData[];
}

const CommentList: React.FC<CommentListProps> = ({ ...prop }) => {
  const listItems = prop.comments.map((item, index) => (
    <Comment
      key={index.toString()}
      writerLogin={item.writerLogin}
      content={item.content}
      writerId={item.writerId}
      writeAt={item.writeAt}
      commentId={item.commentId}
    />
  ));

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        fontSize: "16px",
        width: "100%",
      }}
    >
      {listItems}
    </div>
  );
};

export default CommentList;
