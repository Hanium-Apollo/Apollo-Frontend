import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "@emotion/styled";
import { Grid, Button } from "@mui/material";
import { UserInfo } from "../apis/UserServiceType";
import { getCredentials, patchCredentials } from "../apis/UserService";

const Container = styled.div`
  max-width: 1280px;
  min-height: 750px;
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 50px;
  left: 50%;
  transform: translate(-50%);
  alien-items: center;
  justify-content: center;
`;

const MyPageBox = styled(Grid)`
  display: block;
  width: 60%;
  margin-left: 20%;
  height: 85vh;
  margin-top: 50px;
  background-color: gray;
  opacity: 0.8;
  border-radius: 20px;
  padding: 20px 0 10px 0;
  justify-content: center;
  align-items: center;
`;

const ImageBox = styled(Grid)`
  width: 100%;
  display: flex;
  padding-top: 20px;
  justify-content: center;
  align-items: center;
`;

const CredentialsBox = styled.div`
  margin-top: 20px;
  background-color: white;
  opacity: 0.9;
  border-radius: 10px;
  padding: 10px;
`;

const ProfileImage = styled.img`
  border-radius: 50%;
  width: 150px;
  height: 150px;
`;

const TextBox = styled(Grid)`
  width: 100%;
  display: flex;
  color: white;
  align-items: center;
  justify-content: center;
  font-size: 20px;
`;

export const MyPage = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [accountId, setAccountId] = useState<string>("");
  const [accessKey, setAccessKey] = useState<string>("");
  const [secretKey, setSecretKey] = useState<string>("");
  const [region, setRegion] = useState<string>("");
  const [githubToken, setGithubToken] = useState<string>("");
  const [isEditing, setIsEditing] = useState(false);

  const location = useLocation();
  const userId = location.state?.userId as string;

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const info = localStorage.getItem("userInfo");
        const parsedInfo = info ? (JSON.parse(info) as UserInfo) : null;
        setUserInfo(parsedInfo);

        if (parsedInfo) {
          let userId = parsedInfo.id;
          const response = await getCredentials(userId);
          const credentials = response.data;

          if (credentials) {
            setAccountId(credentials.AWSAccountId);
            setAccessKey(credentials.AWSAccessKey);
            setSecretKey(credentials.AWSSecretKey);
            setRegion(credentials.AWSRegion);
            setGithubToken(credentials.GithubOAuthToken);

            setUserInfo((prevInfo) => ({ ...prevInfo, ...credentials }));
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserInfo();
  }, [userId]);

  const profile = userInfo?.avatar_url;
  const name = userInfo?.login;

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      const updatedCredentials = {
        AWSAccountId: accountId,
        AWSAccessKey: accessKey,
        AWSSecretKey: secretKey,
        AWSRegion: region,
        GithubOAuthToken: githubToken,
      };

      await patchCredentials(userId, updatedCredentials);

      console.log("Credentials updated successfully");

      setIsEditing(false);
    } catch (error) {
      console.error("Error updating credentials:", error);
    }
  };

  return (
    <Container>
      <MyPageBox>
        <h1>마이페이지</h1>
        <ImageBox>
          <ProfileImage src={profile} alt="Profile" />
        </ImageBox>
        <TextBox>{name}님 반갑습니다.</TextBox>
        <TextBox>아래는 입력하신 Cred 정보입니다.</TextBox>
        <CredentialsBox>
          <div>
            AWS Account ID:{" "}
            {isEditing ? (
              <input
                type="text"
                value={accountId}
                onChange={(e) => setAccountId(e.target.value)}
              />
            ) : (
              accountId
            )}
          </div>
          <div>
            AWS Access Key:{" "}
            {isEditing ? (
              <input
                type="text"
                value={accessKey}
                onChange={(e) => setAccessKey(e.target.value)}
              />
            ) : (
              accessKey
            )}
          </div>
          <div>
            AWS Secret Key:{" "}
            {isEditing ? (
              <input
                type="text"
                value={secretKey}
                onChange={(e) => setSecretKey(e.target.value)}
              />
            ) : (
              secretKey
            )}
          </div>
          <div>
            AWS Region:{" "}
            {isEditing ? (
              <input
                type="text"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
              />
            ) : (
              region
            )}
          </div>
          <div>
            Github OAuth Token:{" "}
            {isEditing ? (
              <input
                type="text"
                value={githubToken}
                onChange={(e) => setGithubToken(e.target.value)}
              />
            ) : (
              githubToken
            )}
          </div>
          {isEditing ? (
            <Button variant="outlined" onClick={handleSaveClick}>
              저장하기
            </Button>
          ) : (
            <Button variant="outlined" onClick={handleEditClick}>
              수정하기
            </Button>
          )}
        </CredentialsBox>
      </MyPageBox>
    </Container>
  );
};
