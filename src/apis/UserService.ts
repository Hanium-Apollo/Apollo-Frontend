import { apiClient } from "./ApiClient";
import { UserInfo } from "./UserServiceType";
export interface Credentials {
  AWSAccountId: string | null;
  AWSRegion: string | null;
  AWSAccessKey: string | null;
  AWSSecretKey: string;
  GithubOAuthToken: string;
}
export const getAuthenticationService = (code: String) => {
  return apiClient.post(`/api/authenticate`, {}, { params: { code } });
};

export const getUserSignUpService = (parsedInfo: UserInfo) => {
  return apiClient.post(`/api/save/user`, JSON.stringify(parsedInfo), {
    headers: { "Content-Type": "application/json" },
  });
};

export const getUserSignInService = (userLogin: String, userId: String) => {
  return apiClient.post(
    `/api/login/user`,
    {
      userLogin: userLogin,
      userId: userId,
    },
    { withCredentials: true }
  );
};

export const getCredential = (userId: String, credentials: Credentials) => {
  return apiClient.post(
    `/api/credential/${userId}`,
    JSON.stringify(credentials),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
};
