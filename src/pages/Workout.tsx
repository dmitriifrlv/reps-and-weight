import React, { useEffect } from "react";
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
  return workoutData.isError ? (
    <p>There was an error</p>
  ) : workoutData.isLoading ? (
    <p>Warming up</p>
  ) : workoutData.isSuccess ? (
    <WorkoutComponent data={workoutData.data} />
  ) : null;
};
