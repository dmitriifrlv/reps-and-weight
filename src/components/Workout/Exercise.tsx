import { useState, useEffect, useContext } from "react";
import styled from "@emotion/styled";
import { nanoid } from "nanoid";
import { ExerciseType, SetType } from "../../Types/WorkoutTypes";
import { NeoInput } from "../NeoInput";
import { IconButton } from "../IconButton";
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
import { ActionIcon } from "@mantine/core";
import {
  AiOutlineArrowLeft,
  AiOutlineSave,
  AiOutlineDelete,
  AiOutlinePlus,
} from "react-icons/ai";
import { NeoButton } from "..";
import { TextInput } from "@mantine/core";
import { NumberInput } from "@mantine/core";

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

const ExerciseRow = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
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
  reps: 0,
  weight: 0,
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

  const onAddSetHandler = () => {
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
                  label: "myLabel",
                }}
                required
              />
              {/* <NeoInput
                value={exercise}
                onChange={(event) => setExercise(event.target.value)}
                placeholder="Exercise name"
              /> */}
            </ExerciseHeader>
            <SetsContainer>
              {sets.map((set) => (
                <ExerciseRow key={set.id}>
                  <NumberInput
                    defaultValue={18}
                    placeholder="Reps"
                    label="Reps"
                    onChange={(value) => updateSet(set, "reps", value)}
                    // required
                  />
                  <NumberInput
                    defaultValue={18}
                    placeholder="Weight"
                    label="Weight"
                    onChange={(value) => updateSet(set, "weight", value)}
                    // required
                  />
                  {/* <NeoInput
                    placeholder="Reps"
                    value={set.reps}
                    type="number"
                    onChange={(event) =>
                      updateSet(set, "reps", event.target.value)
                    }
                  /> */}
                  {/* <NeoInput
                    placeholder="Weight"
                    value={set.weight}
                    type="number"
                    onChange={(event) =>
                      updateSet(set, "weight", event.target.value)
                    }
                  /> */}
                  <ActionIcon
                    variant="light"
                    onClick={() => onDeleteSetHandler(set)}
                    size="lg"
                    sx={{ alignSelf: "flex-end" }}
                  >
                    <AiOutlineDelete size="24px" />
                  </ActionIcon>
                  {/* <IconButton
                    icon={<AiOutlineDelete size="1.5rem" />}
                    onClick={() => onDeleteSetHandler(set)}
                  /> */}
                </ExerciseRow>
              ))}
            </SetsContainer>
          </WorkoutCard>
        </WorkoutContainer>
      </Main>
      <Footer>
        {/* <IconButton
          icon={<AiOutlinePlus size="1.5rem" />}
          onClick={onAddSetHandler}
          color="red"
        /> */}
        <NeoButton
          icon={<AiOutlinePlus size="1.5rem" />}
          onClick={onAddSetHandler}
          color="red"
          text="Add New Set"
        />
      </Footer>
    </Layout>
  );
};
