import { WorkoutDataType, ExerciseType } from "../../Types/WorkoutTypes";

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

export type { WorkoutType, WorkoutActionType };
