import { useEffect } from "react";
import { Workout as WorkoutComponent } from "../components/Workout/Workout";
import { useLazyGetWorkoutQuery } from "../app/service";
import { useParams } from "react-router-dom";

export const Workout = () => {
  const params = useParams();
  const editMode = Boolean(params.workoutId);
  const [getWorkout, workoutData] = useLazyGetWorkoutQuery();

  useEffect(() => {
    if (editMode) {
      getWorkout(params.workoutId!);
    }
  }, [editMode, getWorkout, params.workoutId]);

  if (!editMode) {
    return <WorkoutComponent />;
  }
  if (workoutData.isError) {
    return <p>There was an error</p>;
  }
  if (workoutData.isLoading) {
    return <p>Warming up</p>;
  }
  return workoutData.isSuccess ? (
    <WorkoutComponent data={workoutData.data} />
  ) : null;
};
