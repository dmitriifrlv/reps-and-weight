import { useState, useEffect, useContext } from "react";
import styled from "@emotion/styled";
import { nanoid } from "nanoid";
import { ExerciseType, SetType } from "../../Types/WorkoutTypes";
import { WorkoutContainer, WorkoutCard } from "./Styles";
import { ThemeContext } from "../../Styles/ThemeContext";
import {
  Layout,
  Header,
  Main,
  Footer,
  Navigation,
  ButtonBlock,
} from "../Layout.styles";
import { ActionIcon, TextInput, NumberInput } from "@mantine/core";
import {
  AiOutlineArrowLeft,
  AiOutlineSave,
  AiOutlineDelete,
  AiOutlinePlus,
} from "react-icons/ai";
import { NeoButton } from "..";
import { AnimatePresence, motion } from "framer-motion";
import { ButtonContainer } from "../../pages/Home";

const ExerciseHeader = styled.div`
  width: 100%;
  padding: 16px 32px;
  @media (max-width: 768px) {
    padding: 0 32px;
  }
`;
const SetsContainer = styled.div`
  width: 100%;
  height: 100%;
  max-height: 100%;
  overflow-y: auto;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-top: 4px;
  padding-bottom: 32px;
`;

const ExerciseRow = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 24px;
`;

type ExerciseProps = {
  setExercisePage: (arg: boolean) => void;
  onDeleteExerciseHandler: (arg: ExerciseType) => void;
  onAddExerciseHandler: (arg: ExerciseType) => void;
  onEditExerciseHandler: (arg: ExerciseType, arg2: ExerciseType) => void;
  data: ExerciseType;
  setEditExercise: (arg: any) => void;
};

const initialSetState = {
  reps: undefined,
  weight: undefined,
};

export const Exercise = ({
  setExercisePage,
  onAddExerciseHandler,
  onEditExerciseHandler,
  data,
  setEditExercise,
  onDeleteExerciseHandler,
}: ExerciseProps) => {
  const { darkMode } = useContext(ThemeContext);
  const [editMode] = useState(data === null ? false : true);
  const [exercise, setExercise] = useState("");
  const [set, setSet] = useState(initialSetState);
  const [sets, setSets] = useState<SetType[] | []>([]);
  const [setError, setSetError] = useState(false);

  const onAddSetHandler = () => {
    const emptyField = sets.find((set) =>
      Object.values(set).includes(undefined)
    );
    if (emptyField) {
      setSetError(true);
      return;
    }
    const newSets = [...sets];
    newSets.push({ ...set, id: nanoid() });
    setSets(newSets);
    setSet(initialSetState);
  };

  const onDeleteSetHandler = (setToDelete: SetType) =>
    setSets(sets.filter((set) => set !== setToDelete));

  const editExerciseHandler = () => {
    onEditExerciseHandler({ exercise, sets }, data);
    setExercisePage(false);
    setEditExercise(null);
  };

  useEffect(() => {
    if (editMode) {
      setExercise(data.exercise);
      setSets(data.sets);
    }
  }, [data, editMode]);

  const updateSet = (setToEdit: any, property: any, newValue: any) => {
    const idx = sets.findIndex((set) => set === setToEdit);
    const item = sets.find((set) => set === setToEdit);
    if (item) {
      const newItem = { ...item, [property]: newValue };
      const newArr = [...sets];
      newArr.splice(idx, 1, newItem);
      setSets(newArr);
    }
  };

  const deleteExerciseHandler = () => {
    onDeleteExerciseHandler(data);
    setExercise("");
    setSets([]);
  };

  return (
    <Layout>
      <Header>
        <Navigation>
          <ActionIcon
            onClick={() => {
              setExercisePage(false);
              setEditExercise(null);
            }}
            size="lg"
          >
            <AiOutlineArrowLeft size="24px" />
          </ActionIcon>
          <ButtonBlock>
            {editMode && (
              <ActionIcon onClick={deleteExerciseHandler} size="lg">
                <AiOutlineDelete size="24px" />
              </ActionIcon>
            )}
            <ActionIcon
              onClick={
                editMode
                  ? () => editExerciseHandler()
                  : () => onAddExerciseHandler({ exercise, sets })
              }
              size="lg"
            >
              <AiOutlineSave size="24px" />
            </ActionIcon>
          </ButtonBlock>
        </Navigation>
      </Header>
      <Main>
        <WorkoutContainer>
          <WorkoutCard darkMode={darkMode}>
            <ExerciseHeader>
              <TextInput
                value={exercise}
                onChange={(event) => setExercise(event.target.value)}
                placeholder="Bench Press"
                label="Exercise Name"
                classNames={{
                  label: "text",
                  input: "text-l",
                }}
                size="md"
              />
            </ExerciseHeader>
            <SetsContainer>
              <AnimatePresence>
                {sets.map((set, index) => (
                  <ExerciseRow
                    key={set.id}
                    initial={{ y: 1000 }}
                    animate={{ y: 0 }}
                    exit={{ x: -1000 }}
                    transition={{
                      ease: "easeInOut",
                      duration: 0.2,
                    }}
                    layout
                  >
                    <NumberInput
                      placeholder="Reps"
                      label={index === 0 ? "Reps:" : null}
                      onChange={(value) => updateSet(set, "reps", value)}
                      classNames={{
                        label: "text",
                        input: "text-l",
                      }}
                      sx={{ width: "100%" }}
                      size="md"
                      value={set.reps}
                      error={setError && !set.reps && "Cannot be empty"}
                    />
                    <NumberInput
                      placeholder="Weight"
                      label={index === 0 ? "Weight:" : null}
                      onChange={(value) => updateSet(set, "weight", value)}
                      classNames={{
                        label: "text",
                        input: "text-l",
                      }}
                      sx={{ width: "100%" }}
                      size="md"
                      step={0.25}
                      precision={2}
                      value={set.weight}
                    />
                    <ActionIcon
                      variant="light"
                      onClick={() => onDeleteSetHandler(set)}
                      size="xl"
                      sx={{ alignSelf: "flex-end" }}
                    >
                      <AiOutlineDelete size="24px" />
                    </ActionIcon>
                  </ExerciseRow>
                ))}
              </AnimatePresence>
            </SetsContainer>
          </WorkoutCard>
        </WorkoutContainer>
      </Main>
      <Footer>
        <ButtonContainer>
          <NeoButton
            icon={<AiOutlinePlus size="1.5rem" />}
            onClick={onAddSetHandler}
            color="red"
            text="Add New Set"
          />
        </ButtonContainer>
      </Footer>
    </Layout>
  );
};
