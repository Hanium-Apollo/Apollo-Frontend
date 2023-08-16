import { apiClient } from "./ApiClient";
import { UserInfo } from "./UserServiceType";
export interface Credentials {
  AWSAccountId: string | null;
  AWSRegion: string | null;
  AWSAccessKey: string | null;
  AWSSecretKey: string;
  GithubOAuthToken: string;
}
export const postAuthenticationService = (code: String) => {
  return apiClient.post(`/api/authenticate`, {}, { params: { code } });
};

export const postUserSignUpService = (parsedInfo: UserInfo) => {
  return apiClient.post(`/api/save/user`, JSON.stringify(parsedInfo), {
    headers: { "Content-Type": "application/json" },
  });
};

export const postUserSignInService = (userLogin: String, userId: String) => {
  return apiClient.post(
    `/api/login/user`,
    {
      userLogin: userLogin,
      userId: userId,
    },
    { withCredentials: true, headers: { "Content-Type": "application/json" } }
  );
};

export const postCredential = (userId: String, credentials: Credentials) => {
  return apiClient.post(
    `/api/credential/${userId}`,
    JSON.stringify(credentials),
    { withCredentials: true, headers: { "Content-Type": "application/json" } }
  );
};

export const getCredentials = (userId: String) => {
  return apiClient.get(`/api/credential/${userId}`, {});
};

export const patchCredentials = (userId: String, credentials: Credentials) => {
  return apiClient.patch(`/api/credential/${userId}`, credentials, {
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  });
};
