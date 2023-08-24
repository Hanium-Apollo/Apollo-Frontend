import React, { useState, useEffect, useRef } from "react";
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
const EditLine = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
`;
const EditName = styled.div`
  flex: 1;
  height: 100%;
  text-align: end;
`;
const EditInput = styled.div`
  flex: 1;
  height: 100%;
  text-align: start;
  margin-left: 5px;
`;

export const MyPage = () => {
  const [accountId, setAccountId] = useState<string>("");
  const [accessKey, setAccessKey] = useState<string>("");
  const [secretKey, setSecretKey] = useState<string>("");
  const [region, setRegion] = useState<string>("");
  const [githubToken, setGithubToken] = useState<string>("");
  const [isEditing, setIsEditing] = useState(false);
  const accountIdRef = useRef<HTMLInputElement | null>(null);
  const accessKeyRef = useRef<HTMLInputElement | null>(null);
  const secretKeyRef = useRef<HTMLInputElement | null>(null);
  const regionRef = useRef<HTMLInputElement | null>(null);
  const githubTokenRef = useRef<HTMLInputElement | null>(null);

  let info = localStorage.getItem("userInfo");
  const parsedInfo = info ? (JSON.parse(info) as UserInfo) : null;
  const userId = parsedInfo?.id;
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        if (userId) {
          const response = await getCredentials(userId);
          const credentials = response.data;

          if (credentials) {
            setAccountId(credentials.AWSAccountId);
            setAccessKey(credentials.AWSAccessKey);
            setSecretKey(credentials.AWSSecretKey);
            setRegion(credentials.AWSRegion);
            setGithubToken(credentials.GithubOAuthToken);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserInfo();
  }, [userId]);

  const profile = parsedInfo?.avatar_url;
  const name = parsedInfo?.login;

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveClick = async () => {
    try {
      const updatedCredentials = {
        AWSAccountId: accountIdRef.current
          ? accountIdRef.current.value
          : accountId,
        AWSAccessKey: accessKeyRef.current
          ? accessKeyRef.current.value
          : accessKey,
        AWSSecretKey: secretKeyRef.current
          ? secretKeyRef.current.value
          : secretKey,
        AWSRegion: regionRef.current ? regionRef.current.value : region,
        GithubOAuthToken: githubTokenRef.current
          ? githubTokenRef.current.value
          : githubToken,
      };
      console.log(updatedCredentials.AWSRegion);
      if (userId) {
        await patchCredentials(userId, updatedCredentials);

        console.log("Credentials updated successfully");

        setIsEditing(false);
      }
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
          <EditLine>
            <EditName>AWS Account ID: </EditName>
            <EditInput>
              {isEditing ? (
                <input
                  type="text"
                  value={accountId}
                  onChange={(e) => setAccountId(e.target.value)}
                  ref={accountIdRef}
                />
              ) : (
                accountId
              )}
            </EditInput>
          </EditLine>
          <EditLine>
            <EditName>AWS Access Key: </EditName>
            <EditInput>
              {isEditing ? (
                <input
                  type="text"
                  value={accessKey}
                  onChange={(e) => setAccessKey(e.target.value)}
                  ref={accessKeyRef}
                />
              ) : (
                accessKey
              )}
            </EditInput>
          </EditLine>
          <EditLine>
            <EditName>AWS Secret Key: </EditName>
            <EditInput>
              {isEditing ? (
                <input
                  type="text"
                  value={secretKey}
                  onChange={(e) => setSecretKey(e.target.value)}
                  ref={secretKeyRef}
                />
              ) : (
                secretKey
              )}
            </EditInput>
          </EditLine>
          <EditLine>
            <EditName>AWS Region: </EditName>
            <EditInput>
              {isEditing ? (
                <input
                  type="text"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  ref={regionRef}
                />
              ) : (
                region
              )}
            </EditInput>
          </EditLine>
          <EditLine>
            <EditName>Github OAuth Token: </EditName>
            <EditInput>
              {isEditing ? (
                <input
                  type="text"
                  value={githubToken}
                  onChange={(e) => setGithubToken(e.target.value)}
                  ref={githubTokenRef}
                />
              ) : (
                githubToken
              )}
            </EditInput>
          </EditLine>
          {isEditing ? (
            <>
              <Button
                variant="outlined"
                onClick={handleEditClick}
                style={{ marginRight: "5px" }}
              >
                취소하기
              </Button>
              <Button
                variant="outlined"
                onClick={handleSaveClick}
                style={{ marginLeft: "5px" }}
              >
                저장하기
              </Button>
            </>
          ) : (
            <Button
              variant="outlined"
              onClick={handleEditClick}
              style={{ marginTop: "10px" }}
            >
              수정하기
            </Button>
          )}
        </CredentialsBox>
      </MyPageBox>
    </Container>
  );
};
