type SetType = {
  reps: number | undefined;
  weight: number | undefined;
  id?: string;
};
type ExerciseType = {
  sets: SetType[];
  _id?: string;
  measure?: string;
  exercise: string;
};

type WorkoutDataType = {
  muscleGroups: string[] | [];
  _id?: string;
  date: Date;
  exercises: ExerciseType[] | [];
};

type MuscleGroupType = {
  value: string;
  label: string;
};

type UserDataType = {
  email: string;
  workouts: WorkoutDataType[];
};

export type {
  SetType,
  ExerciseType,
  WorkoutDataType,
  MuscleGroupType,
  UserDataType,
};
