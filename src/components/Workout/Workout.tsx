import { useContext, useEffect, useState, useReducer } from "react";
import { WorkoutDataType, ExerciseType } from "../../Types/WorkoutTypes";
import { WorkoutType, WorkoutActionType } from "./Workout.types";
import { Exercise } from "./Exercise";
import { ExerciseCard } from "./ExerciseCard";
import {
  useAddWorkoutMutation,
  useDeleteWorkoutMutation,
  useUpdateWorkoutMutation,
} from "../../app/service";
import { useNavigate, useParams } from "react-router-dom";
import { ThemeContext } from "../../Styles/ThemeContext";
import {
  InputContainer,
  WorkoutContainer,
  WorkoutCard,
  WorkoutHeader,
  ExercisesContainer,
} from "./Styles";
import {
  Layout,
  Header,
  Main,
  Footer,
  Navigation,
  ButtonBlock,
} from "../Layout.styles";
import { NeoButton } from "..";
import { ActionIcon, MultiSelect } from "@mantine/core";
import {
  AiOutlineArrowLeft,
  AiOutlineSave,
  AiOutlineDelete,
} from "react-icons/ai";
import { DatePicker } from "@mantine/dates";
import { ButtonContainer } from "../../pages/Home";
import { isFetchBaseQueryErrorWithStringError } from "../../app/helpers";
import { useNotifications } from "@mantine/notifications";

type SelectOptionType = { value: string; label: string };

const options: SelectOptionType[] = [
  { value: "Chest", label: "Chest" },
  { value: "Back", label: "Back" },
  { value: "Triceps", label: "Triceps" },
  { value: "Biceps", label: "Biceps" },
  { value: "Shoulders", label: "Shoulders" },
  { value: "ABS", label: "ABS" },
  { value: "Legs", label: "Legs" },
  { value: "Glutes", label: "Glutes" },
  { value: "Calves", label: "Calves" },
];

const initialState: WorkoutDataType = {
  muscleGroups: [],
  date: new Date(),
  exercises: [],
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
  const notifications = useNotifications();
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

  const onSaveWorkoutHandler = async () => {
    try {
      await addWorkout(workout).unwrap();
      notifications.showNotification({
        title: "Success",
        message: "Your workout has been successfully saved!",
        color: "green",
      });
    } catch (err) {
      if (isFetchBaseQueryErrorWithStringError(err)) {
        notifications.showNotification({
          title: "Error",
          message: err.data.message,
          color: "red",
        });
      } else {
        notifications.showNotification({
          title: "Error",
          message: "Something went wrong. Please try again later",
          color: "red",
        });
      }
    }
  };

  const onUpdateWorkoutHandler = async () => {
    try {
      await updateWorkout({ id: params.workoutId, payload: workout }).unwrap();
      notifications.showNotification({
        title: "Success",
        message: "Your workout has been successfully updated!",
        color: "green",
      });
    } catch (err) {
      if (isFetchBaseQueryErrorWithStringError(err)) {
        notifications.showNotification({
          title: "Error",
          message: err.data.message,
          color: "red",
        });
      } else {
        notifications.showNotification({
          title: "Error",
          message: "Something went wrong. Please try again later",
          color: "red",
        });
      }
    }
  };

  const onDeleteWorkoutHandler = async () => {
    try {
      await deleteWorkout(params.workoutId).unwrap();
      notifications.showNotification({
        title: "Success",
        message: "Your workout has been successfully deleted!",
        color: "green",
      });
    } catch (err) {
      if (isFetchBaseQueryErrorWithStringError(err)) {
        notifications.showNotification({
          title: "Error",
          message: err.data.message,
          color: "red",
        });
      } else {
        notifications.showNotification({
          title: "Error",
          message: "Something went wrong. Please try again later",
          color: "red",
        });
      }
    }
  };

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

  useEffect(() => {
    const date = localStorage.getItem("date");
    if (date) {
      dispatchWorkout({
        type: "dateChange",
        payload: new Date(JSON.parse(date)),
      });
    }
    return () => localStorage.removeItem("date");
  }, []);

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
    <Layout>
      <Header>
        <Navigation>
          <ActionIcon onClick={() => navigate(-1)} size="lg">
            <AiOutlineArrowLeft size="24px" />
          </ActionIcon>
          <ButtonBlock>
            {editMode && (
              <ActionIcon onClick={onDeleteWorkoutHandler} size="lg">
                <AiOutlineDelete size="24px" />
              </ActionIcon>
            )}
            <ActionIcon
              onClick={editMode ? onUpdateWorkoutHandler : onSaveWorkoutHandler}
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
            <WorkoutHeader>
              <InputContainer>
                <DatePicker
                  placeholder="Pick date"
                  label="Workout Date"
                  value={
                    typeof workout.date === "string"
                      ? new Date(workout.date)
                      : workout.date
                  }
                  onChange={(date: Date) =>
                    dispatchWorkout({ type: "dateChange", payload: date })
                  }
                  size="md"
                  classNames={{
                    label: "text",
                    input: "text-l",
                    day: "text-l",
                    weekday: "text-l",
                    month: "text-l",
                  }}
                />
              </InputContainer>
              <InputContainer>
                <MultiSelect
                  required
                  label="Muscle Groups"
                  placeholder="What do you train today?"
                  data={options}
                  classNames={{
                    label: "text",
                    input: "text-l",
                    dropdown: "text-l",
                  }}
                  value={workout.muscleGroups}
                  onChange={(value) =>
                    dispatchWorkout({
                      type: "muscleGroupsChange",
                      payload: value,
                    })
                  }
                  size="md"
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
      </Main>
      <Footer>
        <ButtonContainer>
          <NeoButton
            onClick={() => setExercisePage(true)}
            text="Add exercise"
            color="red"
          />
        </ButtonContainer>
      </Footer>
    </Layout>
  );
};

export { Workout };
