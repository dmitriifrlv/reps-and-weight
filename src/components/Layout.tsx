import styled from "@emotion/styled";
import {
  AiOutlinePlus,
  AiOutlineUser,
  AiOutlineArrowLeft,
  AiOutlineSave,
} from "react-icons/ai";
import { NeoButton } from "../components/NeoButton";
import { useLocation, useNavigate, Outlet } from "react-router-dom";

type LayoutProps = {
  onSaveWorkoutHandler?: () => void;
  loading?: boolean;
};

const LayoutContainer = styled.div`
  label: layoutContainer;
  height: 100%;
  width: 100vw;
`;

const AppContainer = styled.main`
  label: appContainer;
  height: calc(100% - 6rem);
  width: 100vw;
`;

const Navigation = styled.nav`
  label: navigation;
  width: 100vw;
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
  padding: 1.5rem 0;
  font-weight: 600;
`;

export const Layout = ({ onSaveWorkoutHandler, loading }: LayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <LayoutContainer>
      <AppContainer>
        <Outlet />
      </AppContainer>
      <Navigation>
        {location.pathname === "/" ? (
          <>
            <NeoButton
              icon={<AiOutlineUser size="1.5rem" />}
              text="Profile"
              onClick={() => navigate("/profile")}
            />

            <NeoButton
              icon={<AiOutlinePlus size="1.5rem" />}
              text="New Workout"
              onClick={() => navigate("/workout/add")}
            />
          </>
        ) : location.pathname.includes("workout") ? (
          <>
            <NeoButton
              icon={<AiOutlineArrowLeft size="1.5rem" />}
              text="Back To Home"
              onClick={() => navigate("/")}
            />
            <NeoButton
              icon={<AiOutlineSave size="1.5rem" />}
              text="Save"
              onClick={() => navigate("/")}
              // onClick={() =>
              //   onSaveWorkoutHandler
              //     ? onSaveWorkoutHandler()
              //     : console.warn("the save func is missing ")
              //}
            />
          </>
        ) : location.pathname === "/profile" ? (
          <>
            <NeoButton
              icon={<AiOutlineArrowLeft size="1.5rem" />}
              text="Back To Home"
              onClick={() => navigate("/")}
            />
          </>
        ) : (
          ""
        )}
      </Navigation>
    </LayoutContainer>
  );
};
