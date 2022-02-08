import { useGetUserInfoQuery } from "../app/service";
import styled from "@emotion/styled";
import { Layout, Header, Main, Navigation } from "../components/Layout.styles";
import { useNavigate } from "react-router-dom";
import { ActionIcon } from "@mantine/core";
import { AiOutlineArrowLeft } from "react-icons/ai";

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
  const navigate = useNavigate();

  return (
    <Layout>
      <Header>
        <Navigation>
          <ActionIcon onClick={() => navigate(-1)} size="lg">
            <AiOutlineArrowLeft size="24px" />
          </ActionIcon>
        </Navigation>
      </Header>
      <Main>
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
      </Main>
    </Layout>
  );
};
