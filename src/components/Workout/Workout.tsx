import React, { useContext, useEffect, useState } from "react";
import { Layout } from "../Layout";
import styled from "@emotion/styled";
import { CardProps } from "../../Types/StyledElementsTypes";
import { NeoButton } from "../NeoButton";
import MuscleGroupSelector from "../../components/MuscleGroupSelector/MuscleGroupSelector";
import { WorkoutDataType } from "../../Types/WorkoutTypes";
import { Exercise } from "./Exercise";
import { ExerciseCard } from "./ExerciseCard";
import {
  useAddWorkoutMutation,
  useDeleteWorkoutMutation,
  useUpdateWorkoutMutation,
} from "../../app/service";
import { useNavigate, useParams } from "react-router-dom";
import { DateInput } from "../DatePicker/DatePicker";
import { ThemeContext } from "../../Styles/ThemeContext";

const InputContainer = styled.div`
  width: 100%;
`;

const WorkoutContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const WorkoutCard = styled.div<CardProps>`
  width: 500px;
  height: 80%;
  box-shadow: ${({ darkMode, theme }) =>
    darkMode ? theme.shadows.dark.bsDark : theme.shadows.light.bsLight};
  transition: box-shadow 0.2s ease;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
    box-shadow: none;
  }
`;

const WorkoutHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 2rem 2rem 0 2rem;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ExercisesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  max-height: 100%;
  overflow-y: auto;
  gap: 1.5rem;
  padding: 1rem 2rem;
`;

const BtnBlock = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 0rem 2rem 2rem 2rem;
`;

const initialState: WorkoutDataType = {
  muscleGroups: [],
  date: new Date(),
  exercises: [],
};

type WorkoutType = {
  data?: WorkoutDataType;
};

const Workout = ({ data }: WorkoutType) => {
  const navigate = useNavigate();
  const params = useParams();
  const editMode = params.id === undefined ? false : true;
  const [exercisePage, setExercisePage] = useState(false);
  const [workout, setWorkout] = useState(initialState);
  const [editExercise, setEditExercise] = useState<any | null>(null);
  const { darkMode } = useContext(ThemeContext);
  const [addWorkout, addWorkoutResponse] = useAddWorkoutMutation();
  const [deleteWorkout, deleteWorkoutResponse] = useDeleteWorkoutMutation();
  const [updateWorkout, updateWorkoutResponse] = useUpdateWorkoutMutation();

  const ExampleCustomInput = React.forwardRef<any, any>(
    ({ value, onClick }: any, ref) => {
      return (
        <div onClick={onClick} ref={ref}>
          {value}
        </div>
      );
    }
  );
  ExampleCustomInput.displayName = "picker";

  const onAddExerciseHandler = (exercise: any) => {
    const newExercises = [...workout.exercises];
    newExercises.push(exercise);
    setWorkout((prevState) => ({ ...prevState, exercises: newExercises }));
    setExercisePage(false);
  };

  const onSaveWorkoutHandler = () => addWorkout(workout);

  const onUpdateWorkoutHandler = () =>
    updateWorkout({ id: params.id, body: workout });

  const onDeleteWorkoutHandler = () => deleteWorkout(params.id);

  useEffect(() => {
    if (addWorkoutResponse.isSuccess) {
      navigate("/");
    }
  }, [addWorkoutResponse.isSuccess, navigate]);

  useEffect(() => {
    if (deleteWorkoutResponse.isSuccess) {
      navigate("/");
    }
  }, [deleteWorkoutResponse.isSuccess, navigate]);

  useEffect(() => {
    if (updateWorkoutResponse.isSuccess) {
      navigate("/");
    }
  }, [navigate, updateWorkoutResponse.isSuccess]);

  useEffect(() => {
    if (data) {
      setWorkout(data);
    }
  }, [data]);

  return (
    // <Layout
    //   loading={
    //     editMode
    //       ? updateWorkoutResponse.isLoading
    //       : addWorkoutResponse.isLoading
    //   }
    //   onSaveWorkoutHandler={
    //     editMode ? onUpdateWorkoutHandler : onSaveWorkoutHandler
    //   }
    // >
    <WorkoutContainer>
      <WorkoutCard darkMode={darkMode}>
        {exercisePage ? (
          <Exercise
            onAddExerciseHandler={onAddExerciseHandler}
            setExercisePage={setExercisePage}
            data={editExercise}
            setEditExercise={setEditExercise}
          />
        ) : (
          <>
            <WorkoutHeader>
              <InputContainer>
                <DateInput
                  value={
                    typeof workout.date === "string"
                      ? new Date(workout.date)
                      : workout.date
                  }
                  onChange={(date: Date) =>
                    setWorkout((prevState) => ({ ...prevState, date: date }))
                  }
                />
              </InputContainer>
              <InputContainer>
                <MuscleGroupSelector
                  showMuscleGroups={workout.muscleGroups}
                  onChange={(values) => {
                    const muscleGroups = values.map(
                      (muscleGroup: any) => muscleGroup.value
                    );
                    setWorkout((prevState) => ({
                      ...prevState,
                      muscleGroups: muscleGroups,
                    }));
                  }}
                />
              </InputContainer>
            </WorkoutHeader>
            <ExercisesContainer>
              {workout.exercises.map((exercise, index) => (
                <ExerciseCard
                  setEditExercise={setEditExercise}
                  setExercisePage={setExercisePage}
                  key={index}
                  data={exercise}
                />
              ))}
            </ExercisesContainer>
            <BtnBlock>
              {editMode && (
                <NeoButton
                  isLoading={deleteWorkoutResponse.isLoading}
                  onClick={onDeleteWorkoutHandler}
                  text="Delete"
                />
              )}
              <NeoButton
                onClick={() => setExercisePage(true)}
                text="Add New Exercise"
              />
            </BtnBlock>
          </>
        )}
      </WorkoutCard>
    </WorkoutContainer>
    // </Layout>
  );
};

export { Workout };
