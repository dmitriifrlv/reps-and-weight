import { useState, useEffect, useContext } from "react";
import { AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";
import styled from "@emotion/styled";
import { nanoid } from "nanoid";
import { ExerciseType, SetType } from "../../Types/WorkoutTypes";
import { NeoInput } from "../NeoInput";
import { IconButton } from "../IconButton";
import { WorkoutContainer, WorkoutCard } from "./Styles";
import { ThemeContext } from "../../Styles/ThemeContext";
import { Layout } from "../Layout";

const ExerciseHeader = styled.div`
  width: 100%;
  padding: 2rem 2rem 0 2rem;
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

  return (
    <Layout
      onDeleteExerciseHandler={() => onDeleteExerciseHandler(data)}
      exercisePage={true}
      setExercisePage={setExercisePage}
      onAddExerciseHandler={() =>
        editMode
          ? editExerciseHandler()
          : onAddExerciseHandler({ exercise, sets })
      }
      returnFromExercise={() => {
        setExercisePage(false);
        setEditExercise(null);
      }}
    >
      <WorkoutContainer>
        <WorkoutCard darkMode={darkMode}>
          <ExerciseHeader>
            <NeoInput
              value={exercise}
              onChange={(event) => setExercise(event.target.value)}
              placeholder="Exercise name"
            />
          </ExerciseHeader>
          <SetsContainer>
            {sets.map((set) => (
              <ExerciseRow key={set.id}>
                <NeoInput
                  placeholder="reps"
                  value={set.reps}
                  type="number"
                  onChange={(event) =>
                    updateSet(set, "reps", event.target.value)
                  }
                />
                <NeoInput
                  placeholder="reps"
                  value={set.weight}
                  type="number"
                  onChange={(event) =>
                    updateSet(set, "weight", event.target.value)
                  }
                />

                <IconButton
                  icon={<AiOutlineDelete size="1.5rem" />}
                  onClick={() => onDeleteSetHandler(set)}
                />
              </ExerciseRow>
            ))}
            <ExerciseRow>
              <NeoInput
                placeholder="reps"
                value={set.reps}
                type="number"
                onChange={(event) =>
                  setSet((prevValue) => ({
                    ...prevValue,
                    reps: parseInt(event.target.value, 10),
                  }))
                }
              />
              <NeoInput
                placeholder="weight"
                value={set.weight}
                type="number"
                onChange={(event) =>
                  setSet((prevValue) => ({
                    ...prevValue,
                    weight: parseInt(event.target.value, 10),
                  }))
                }
              />
              <IconButton
                icon={<AiOutlinePlus size="1.5rem" />}
                onClick={onAddSetHandler}
              />
            </ExerciseRow>
          </SetsContainer>
        </WorkoutCard>
      </WorkoutContainer>
    </Layout>
  );
};
