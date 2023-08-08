import { apiClient } from "./ApiClient";

export const getRepoListService = (userLogin: String) => {
  return apiClient.get(`/api/repository/list/${userLogin}`, {});
};

export const clientRepoCreateService = (repoName: String) => {
  return apiClient.post(
    `/api/cloudformation/client`,
    { repoName: repoName },
    { withCredentials: true }
  );
};

export const serverRepoCreateService = (repoName: String) => {
  return apiClient.post(
    `/api/cloudformation/server`,
    { repoName: repoName },
    { withCredentials: true }
  );
};
