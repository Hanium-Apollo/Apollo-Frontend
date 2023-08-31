import { apiClient } from "./ApiClient";

export const getBoardList = (pageNum: number) => {
  const queryParams = { pageNum: pageNum };
  return apiClient.get(`/api/board`, { params: queryParams });
};

export const postBoard = (
  userId: string,
  title: string,
  content: string,
  tagNames: string[]
) => {
  return apiClient.post(
    `/api/board`,
    { userId: userId, title: title, content: content, tagNames: tagNames },
    { withCredentials: true, headers: { "Content-Type": "application/json" } }
  );
};

export const getBoardDetail = (postId: string) => {
  return apiClient.get(`/api/board/${postId}`, {});
};

export const getBoardbyTag = (tagId: string, pageNum: number) => {
  const queryParams = { tagId: tagId, pageNum: pageNum };
  return apiClient.get(`/api/board/associate-with`, { params: queryParams });
};

export const getBoardbyContent = (searchString: string, pageNum: number) => {
  return apiClient.get(`/api/board/titleOrContent/${searchString}/${pageNum}`);
};

export const deleteBoard = (postId: string, userId: string) => {
  return apiClient.delete(`/api/board/${postId}`, {
    data: { userId: userId },
    withCredentials: true,
  });
};

export const patchBoard = (
  postId: string,
  userId: string,
  title: string,
  content: string,
  tagNames: string[]
) => {
  return apiClient.patch(
    `/api/board/${postId}`,
    { userId: userId, title: title, content: content, tagNames: tagNames },
    { withCredentials: true, headers: { "Content-Type": "application/json" } }
  );
};

export const postComment = (
  userId: string,
  postId: string,
  content: string
) => {
  return apiClient.post(
    `/api/comment`,
    { userId: userId, postId: postId, content: content },
    { withCredentials: true, headers: { "Content-Type": "application/json" } }
  );
};
export const deleteComment = (commentId: string, userId: string) => {
  return apiClient.delete(`/api/comment/${commentId}`, {
    data: { userId: userId },
    withCredentials: true,
  });
};

export const patchComment = (
  commentId: string,
  content: string,
  userId: string
) => {
  return apiClient.patch(
    `/api/comment/${commentId}`,
    { content: content, userId: userId },
    { withCredentials: true, headers: { "Content-Type": "application/json" } }
  );
};
