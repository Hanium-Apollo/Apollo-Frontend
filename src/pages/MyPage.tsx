import React, { useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { Grid } from "@mui/material";
import { UserInfo } from "../apis/UserServiceType";
import { getCredentials, patchCredentials } from "../apis/UserService";

const Container = styled.div`
  position: absolute;
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const MyPageContainer = styled.div`
  position: absolute;
  max-width: 1440px;
  min-height: 750px;
  display: flex;
  width: 100vw;
  top: 50px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 1;
`;

const MyPageBox = styled(Grid)`
  display: flex;
  width: 70%;
  height: 350px;
  padding: 50px;
  margin: 30px 0 30px 0;
  background-color: gray;
  opacity: 0.8;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  flex-direction: row;

  @media (max-width: 768px) {
    width: 90vw;
  }
`;

const ImageBox = styled(Grid)`
  width: 100%;
  display: flex;
  padding-top: 20px;
  justify-content: center;
  align-items: center;
`;

const CredentialsBox = styled.div`
  width: 70%;
  background-color: gray;
  opacity: 0.8;
  border-radius: 10px;
  padding: 40px;
  font-size: 20px;
  color: white;
`;

const ProfileImage = styled.img`
  border-radius: 50%;
  width: 200px;
  height: 200px;
`;

const TextBox = styled(Grid)`
  width: 100%;
  display: flex;
  color: white;
  align-items: flex-start;
  font-size: 30px;
  font-weight: bold;
  padding: 10px;
`;

const TextBoxContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
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
const StyledButton = styled.button`
  background-color: #4cbccc;
  border: none;
  border-radius: 10px;
  width: 100px;
  height: 40px;
  font-size: 16px;
  cursor: pointer;
  color: white;
  font-weight: bold;
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
      <MyPageContainer>
        <MyPageBox>
          <ImageBox>
            <ProfileImage src={profile} alt="Profile" />
          </ImageBox>
          <TextBoxContainer>
            <TextBox>{name}님 안녕하세요.</TextBox>
            <TextBox style={{ fontSize: "20px" }}>
              아래는 입력하신 Cred 정보입니다.
            </TextBox>
          </TextBoxContainer>
        </MyPageBox>
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
                "********"
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
                "********"
              )}
            </EditInput>
          </EditLine>
          {isEditing ? (
            <>
              <StyledButton
                onClick={handleEditClick}
                style={{ marginRight: "5px" }}
              >
                취소하기
              </StyledButton>
              <StyledButton
                onClick={handleSaveClick}
                style={{ marginLeft: "5px" }}
              >
                저장하기
              </StyledButton>
            </>
          ) : (
            <StyledButton
              onClick={handleEditClick}
              style={{ marginTop: "10px" }}
            >
              수정하기
            </StyledButton>
          )}
        </CredentialsBox>
      </MyPageContainer>
    </Container>
  );
};
