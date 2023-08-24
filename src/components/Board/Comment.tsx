import { CommentData } from "../../pages/Borad/PostPage";
import { UserInfo } from "../../apis/UserServiceType";
import { deleteComment } from "../../apis/BoardService";

const Comment = (prop: CommentData) => {
  let info = localStorage.getItem("userInfo");
  const parsedInfo = info ? (JSON.parse(info) as UserInfo) : null;
  const userId = parsedInfo?.id;
  const Delete = () => {
    deleteComment(prop.commentId, prop.writerId);
  };

  return (
    <div
      style={{
        width: "100%",
        minHeight: "65px",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        fontSize: "16px",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "25px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          margin: "10px 15px 10px 15px",
          fontFamily: "MainFont",
          flexDirection: "row",
        }}
      >
        <div
          style={{ flex: "1", display: "flex", justifyContent: "flex-start" }}
        >
          {prop.writerId}
        </div>
        {prop.writerId === userId && (
          <div
            style={{ flex: "1", display: "flex", justifyContent: "flex-end" }}
            onClick={Delete}
          >
            삭제하기
          </div>
        )}
      </div>

      <div
        style={{
          flex: "1",
          width: "100%",
          padding: "0px 30px 10px 40px",
          wordWrap: "break-word",
          borderBottom: "1px solid #B7BBC8",
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        {prop.content}
      </div>
    </div>
  );
};

export default Comment;
