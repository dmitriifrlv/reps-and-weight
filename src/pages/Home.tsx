import { Calendar } from "../components/Calendar/Calendar";
import {
  Layout,
  Header,
  Main,
  Footer,
  Navigation,
} from "../components/Layout.styles";
import { CalendarLoadingScreen } from "../components/Calendar/CalendarLoadingScreen";
import { useGetUserInfoQuery } from "../app/service";
import { NeoButton } from "../components";
import { ActionIcon } from "@mantine/core";
import { MdExitToApp } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../app/AuthContext";

export const Home = () => {
  const { isSuccess, data, error, isLoading } = useGetUserInfoQuery();
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  return (
    <Layout>
      <Header>
        <Navigation>
          <ActionIcon onClick={() => logout()} size="lg">
            <MdExitToApp size="24px" />
          </ActionIcon>
          <ActionIcon onClick={() => navigate("/profile")} size="lg">
            <AiOutlineUser size="24px" />
          </ActionIcon>
        </Navigation>
      </Header>
      <Main>
        {error ? (
          <p>There was an error</p>
        ) : isLoading ? (
          <CalendarLoadingScreen />
        ) : isSuccess ? (
          <Calendar workouts={data.workouts} />
        ) : null}
      </Main>
      <Footer>
        <NeoButton
          onClick={() => navigate("/workout")}
          text="Add exercise"
          color="red"
        />
      </Footer>
    </Layout>
  );
};
