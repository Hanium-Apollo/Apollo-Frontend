import { apiClient } from "./ApiClient";

export const getRepoListService = (userId: String) => {
  return apiClient.get(`/api/repository/list/${userId}`, {});
};

export const getDeployListService = (userId: String) => {
  return apiClient.get(`api/cloudformation/${userId}`, {});
};

export const clientRepoCreateService = (userId: String, repoName: String) => {
  return apiClient.post(
    `/api/cloudformation/${userId}/client`,
    { repoName: repoName },
    { withCredentials: true, headers: { "Content-Type": "application/json" } }
  );
};

export const serverRepoCreateService = (userId: String, repoName: String) => {
  return apiClient.post(
    `/api/cloudformation/${userId}/server`,
    { repoName: repoName },
    { withCredentials: true, headers: { "Content-Type": "application/json" } }
  );
};

export const clientRepoDeleteService = (userId: String, repoName: string) => {
  return apiClient.delete(`/api/cloudformation/${userId}/client`, {
    data: { repoName: repoName },
    withCredentials: true,
  });
};

export const serverRepoDeleteService = (userId: String, repoName: string) => {
  return apiClient.delete(`/api/cloudformation/${userId}/server`, {
    data: { repoName: repoName },
    withCredentials: true,
  });
};
