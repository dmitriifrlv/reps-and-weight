import { useContext, useEffect, useState, useReducer } from "react";
import { Layout } from "../Layout";
import MuscleGroupSelector, {
  SelectOptionType,
} from "../../components/MuscleGroupSelector/MuscleGroupSelector";
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
      initialState: ExerciseType;
    }
  | {
      type: "deleteExercise";
      payload: ExerciseType;
    }
  | {
      type: "dateChange";
      payload: Date;
    }
  | {
      type: "muscleGroupsChange";
      payload: string[];
    }
  | {
      type: "deleteExercise";
      payload: ExerciseType;
    };

const workoutReducer = (state: WorkoutDataType, action: WorkoutActionType) => {
  switch (action.type) {
    case "loadWorkout":
      return action.payload;
    case "deleteExercise":
      const updatedExercises = [...state.exercises].filter(
        (exercise) => exercise !== action.payload
      );
      return { ...state, exercises: updatedExercises };
    case "addExercise":
      const newExercises = [...state.exercises];
      newExercises.push(action.payload);
      return { ...state, exercises: newExercises };
    case "editExercise":
      const exercises = [...state.exercises];
      const editedExercise = exercises.find(
        (exercise) => exercise === action.initialState
      );
      const editedExerciseIdx = exercises.findIndex(
        (exercise) => exercise === action.initialState
      );
      if (editedExerciseIdx !== -1 && editedExercise) {
        const newExercise = { ...editedExercise, ...action.payload };
        exercises.splice(editedExerciseIdx, 1, newExercise);
        return { ...state, exercises };
      }
      return state;
    case "dateChange":
      return { ...state, date: action.payload };
    case "muscleGroupsChange":
      return { ...state, muscleGroups: action.payload };
    default:
      return state;
  }
};

const Workout = ({ data }: WorkoutType) => {
  const navigate = useNavigate();
  const params = useParams();
  const editMode = Boolean(params.workoutId);
  const [exercisePage, setExercisePage] = useState(false);
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
  const onDeleteExerciseHandler = (exercise: ExerciseType) => {
    dispatchWorkout({ type: "deleteExercise", payload: exercise });
    setExercisePage(false);
  };

  const onEditExerciseHandler = (
    exercise: ExerciseType,
    initialObj: ExerciseType
  ) => {
    dispatchWorkout({
      type: "editExercise",
      payload: exercise,
      initialState: initialObj,
    });
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
        onEditExerciseHandler={onEditExerciseHandler}
        onDeleteExerciseHandler={onDeleteExerciseHandler}
        setExercisePage={setExercisePage}
        data={editExercise}
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
                onChange={(date: Date) =>
                  dispatchWorkout({ type: "dateChange", payload: date })
                }
              />
            </InputContainer>
            <InputContainer>
              <MuscleGroupSelector
                showMuscleGroups={workout.muscleGroups}
                onChange={(values) => {
                  const muscleGroups = values.map(
                    (muscleGroup: SelectOptionType) => muscleGroup.value
                  );
                  dispatchWorkout({
                    type: "muscleGroupsChange",
                    payload: muscleGroups,
                  });
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
