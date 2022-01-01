import styled from "@emotion/styled";
import {
  AiOutlinePlus,
  AiOutlineUser,
  AiOutlineArrowLeft,
  AiOutlineSave,
} from "react-icons/ai";
import { NeoButton } from "../components/NeoButton";
import { TabButton } from "./TabButton";
import { useLocation, useNavigate, Outlet } from "react-router-dom";

type LayoutProps = {
  // children: React.ReactNode;
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
  height: calc(100% - 60px);
  width: 100vw;
`;

const Navigation = styled.nav`
  height: 60px;
  display: flex;
`;

const Divider = styled.hr`
  border-color: rgba(255, 255, 255, 0.12);
`;

export const Layout = ({
  onSaveWorkoutHandler,
  loading,
}: // children,
LayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <LayoutContainer>
      <AppContainer>
        {/* {children} */}
        <Outlet />
      </AppContainer>
      <Navigation>
        {location.pathname === "/" ? (
          <>
            <TabButton
              icon={<AiOutlineUser size="1.5rem" />}
              text="Profile"
              onClick={() => navigate("/profile")}
            />
            <Divider />
            <TabButton
              onClick={() => navigate("/workout")}
              icon={<AiOutlinePlus size="1.5rem" />}
              text="Add"
            />
          </>
        ) : location.pathname.includes("workout") ? (
          <>
            <TabButton
              icon={<AiOutlineArrowLeft size="1.5rem" />}
              text="Back"
              onClick={() => navigate("/")}
            />
            <Divider />
            <TabButton
              onClick={() => navigate("/workout")}
              icon={<AiOutlinePlus size="1.5rem" />}
              text="Add Exercise"
            />
            <Divider />
            <TabButton
              onClick={() => navigate("/workout")}
              icon={<AiOutlineSave size="1.5rem" />}
              text="Save workout"
            />
            {/* <NeoButton
              icon={<AiOutlineArrowLeft size="1.5rem" />}
              text="Back To Home"
              onClick={() => navigate("/")}
            /> */}
            {/* <NeoButton
              icon={<AiOutlineSave size="1.5rem" />}
              text="Save"
              onClick={() => navigate("/")}
              // onClick={() =>
              //   onSaveWorkoutHandler
              //     ? onSaveWorkoutHandler()
              //     : console.warn("the save func is missing ")
              //}
            /> */}
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
