import { useContext, useEffect, useState, useReducer } from "react";
import { Layout } from "../Layout";
import MuscleGroupSelector from "../../components/MuscleGroupSelector/MuscleGroupSelector";
import { WorkoutDataType, ExerciseType } from "../../Types/WorkoutTypes";
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
} from "./Styles";

const initialState: WorkoutDataType = {
  muscleGroups: [],
  date: new Date(),
  exercises: [],
};

type WorkoutType = {
  data?: WorkoutDataType;
};

type WorkoutActionType =
  | {
      type: "loadWorkout";
      payload: WorkoutDataType;
    }
  | {
      type: "addExercise";
      payload: ExerciseType;
    }
  | {
      type: "editExercise";
      payload: ExerciseType;
    }
  | {
      type: "deleteExercise";
      payload: ExerciseType;
    };

const workoutReducer = (state: WorkoutDataType, action: WorkoutActionType) => {
  switch (action.type) {
    case "loadWorkout":
      return action.payload;
    case "addExercise":
      const newExercises = [...state.exercises];
      newExercises.push(action.payload);
      return { ...state, exercises: newExercises };
    default:
      return state;
  }
};

const Workout = ({ data }: WorkoutType) => {
  const navigate = useNavigate();
  const params = useParams();
  const editMode = Boolean(params.workoutId);
  const [exercisePage, setExercisePage] = useState(false);
  // const [workout, setWorkout] = useState(() => data ?? initialState);
  const [workout, dispatchWorkout] = useReducer(workoutReducer, initialState);
  const [editExercise, setEditExercise] = useState<any | null>(null);
  const { darkMode } = useContext(ThemeContext);
  const [addWorkout, addWorkoutResponse] = useAddWorkoutMutation();
  const [deleteWorkout, deleteWorkoutResponse] = useDeleteWorkoutMutation();
  const [updateWorkout, updateWorkoutResponse] = useUpdateWorkoutMutation();

  const onAddExerciseHandler = (exercise: ExerciseType) => {
    dispatchWorkout({ type: "addExercise", payload: exercise });
    setExercisePage(false);
  };

  const onSaveWorkoutHandler = () => addWorkout(workout);

  const onUpdateWorkoutHandler = () =>
    updateWorkout({ id: params.workoutId, payload: workout });

  const onDeleteWorkoutHandler = () => deleteWorkout(params.workoutId);

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
      dispatchWorkout({ type: "loadWorkout", payload: data });
    }
  }, [data]);

  if (exercisePage) {
    return (
      <Exercise
        onAddExerciseHandler={onAddExerciseHandler}
        setExercisePage={setExercisePage}
        data={editExercise}
        // setWorkout={setWorkout}
        setWorkout={() => console.log("hi")}
        workout={workout}
        setEditExercise={setEditExercise}
      />
    );
  }
  return (
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
      onDeleteWorkoutHandler={onDeleteWorkoutHandler}
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
                onChange={
                  (date: Date) => console.log(date)
                  // setWorkout((prevState) => ({ ...prevState, date: date }))
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
                  console.log("hi");
                  // setWorkout((prevState) => ({
                  //   ...prevState,
                  //   muscleGroups: muscleGroups,
                  // }));
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
        </WorkoutCard>
      </WorkoutContainer>
    </Layout>
  );
};

export { Workout };
