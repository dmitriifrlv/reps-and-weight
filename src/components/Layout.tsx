import styled from "@emotion/styled";
import {
  AiOutlinePlus,
  AiOutlineUser,
  AiOutlineArrowLeft,
  AiOutlineSave,
} from "react-icons/ai";
import { GiCheckMark } from "react-icons/gi";

import { NeoButton } from "../components/NeoButton";
import { TabButton } from "./TabButton";
import { useLocation, useNavigate, useParams } from "react-router-dom";

type LayoutProps = {
  children: React.ReactNode;
  onSaveWorkoutHandler?: () => void;
  onAddExerciseHandler?: (exercise: any) => void;
  goToExercisePage?: () => void;
  loading?: boolean;
  editMode?: boolean;
  exercisePage?: boolean;
  setExercisePage?: (arg: boolean) => void;
  returnFromExercise?: () => void;
  onDeleteWorkoutHandler?: () => void;
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
  children,
  editMode,
  onAddExerciseHandler,
  exercisePage,
  setExercisePage,
  goToExercisePage,
  returnFromExercise,
  onDeleteWorkoutHandler,
}: LayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  console.log(exercisePage);
  const params = useParams();
  return (
    <LayoutContainer>
      <AppContainer>{children}</AppContainer>
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
              text="New Workout"
            />
          </>
        ) : location.pathname.includes("workout") ? (
          <>
            <TabButton
              icon={<AiOutlineArrowLeft size="1.5rem" />}
              text="Back"
              onClick={() =>
                exercisePage ? returnFromExercise!() : navigate("/")
              }
            />
            <Divider />
            {!exercisePage && (
              <>
                <TabButton
                  onClick={goToExercisePage!}
                  icon={<AiOutlinePlus size="1.5rem" />}
                  text="Exercise"
                />
                <Divider />
              </>
            )}
            {exercisePage && (
              <>
                <TabButton
                  onClick={onAddExerciseHandler!}
                  icon={<GiCheckMark size="1.5rem" />}
                  text="Add Exercise"
                />
                <Divider />
              </>
            )}
            {params.workoutId && !exercisePage && (
              <>
                <TabButton
                  onClick={onDeleteWorkoutHandler!}
                  icon={<AiOutlineSave size="1.5rem" />}
                  text="Delete"
                />
                <Divider />
              </>
            )}
            {!exercisePage && (
              <TabButton
                onClick={onSaveWorkoutHandler!}
                icon={<AiOutlineSave size="1.5rem" />}
                text="Save"
              />
            )}
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
