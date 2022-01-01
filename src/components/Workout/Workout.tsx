import React, { useContext, useEffect, useState } from "react";
import { Layout } from "../Layout";
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
import {
  InputContainer,
  WorkoutContainer,
  WorkoutCard,
  WorkoutHeader,
  ExercisesContainer,
  BtnBlock,
} from "./Styles";

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

  return exercisePage ? (
    <Exercise
      onAddExerciseHandler={onAddExerciseHandler}
      setExercisePage={setExercisePage}
      data={editExercise}
      setEditExercise={setEditExercise}
    />
  ) : (
    <Layout
      exercisePage={exercisePage}
      setExercisePage={setExercisePage}
      goToExercisePage={() => setExercisePage(true)}
      editMode={editMode}
      loading={
        editMode
          ? updateWorkoutResponse.isLoading
          : addWorkoutResponse.isLoading
      }
      onSaveWorkoutHandler={
        editMode ? onUpdateWorkoutHandler : onSaveWorkoutHandler
      }
    >
      <WorkoutContainer>
        <WorkoutCard darkMode={darkMode}>
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
          </BtnBlock>
        </WorkoutCard>
      </WorkoutContainer>
    </Layout>
  );
};

export { Workout };
