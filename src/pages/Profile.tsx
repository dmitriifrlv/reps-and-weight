import { Layout } from "../components/Layout";
import { useGetUserInfoQuery } from "../app/service";
import styled from "@emotion/styled";
import { NeoButton } from "../components";
import { MdExitToApp } from "react-icons/md";
import { useContext } from "react";
import { AuthContext } from "../app/AuthContext";

const ProfileSection = styled.main`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  font-size: 1.25rem;
`;
const ProfileInfo = styled.span`
  font-weight: 600;
`;

export const Profile = () => {
  const { isSuccess, data, error, isLoading } = useGetUserInfoQuery();
  const { logout } = useContext(AuthContext);
  console.log(data);
  console.log(new Date(data.createdAt).toLocaleString("ru-RU").slice(0, 10));
  return (
    <Layout>
      {error ? (
        <p>There was an error</p>
      ) : isLoading ? (
        <p>Warming up ...</p>
      ) : isSuccess ? (
        <ProfileSection>
          <p>
            Email: <ProfileInfo>{data.email}</ProfileInfo>
          </p>
          <p>
            User since:{" "}
            <ProfileInfo>
              {new Date(data.createdAt).toLocaleString("ru-RU").slice(0, 10)}
            </ProfileInfo>
          </p>
          <p>
            Total workouts: <ProfileInfo>{data.workouts.length}</ProfileInfo>
          </p>
        </ProfileSection>
      ) : null}
    </Layout>
  );
};
