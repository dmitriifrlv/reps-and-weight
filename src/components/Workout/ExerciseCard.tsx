import React from "react";
import styled from "@emotion/styled";
import { SetCard } from "./SetCard";
import { IconButton } from "../IconButton";
import { ExerciseType } from "../../Types/WorkoutTypes";
import { AiOutlineEdit } from "react-icons/ai";

type ExerciseCardType = {
  data: ExerciseType;
  setExercisePage: (arg: boolean) => void;
  setEditExercise: (arg: any) => void;
};

const ExerciseCardContainer = styled.div`
  width: 100%;
  padding: 0.5rem;
  border-radius: 1rem;
  box-shadow: -5px -5px 10px #292828, 5px 5px 10px #171717;
`;
const ExerciseCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem 0 1rem;
`;
const ExerciseCardTitle = styled.h3`
  font-size: 1.25rem;
  font-family: "Baloo Thambi 2";
  min-width: max-content;
  font-weight: 600;
`;
const Line = styled.div`
  height: 0.125rem;
  margin: 0 0.5rem;
  width: 100%;
  background: #f0f0f0;
`;

const SetsContainer = styled.div`
  overflow-x: auto;
  display: flex;
  gap: 1rem;
  padding: 1rem 1rem 1rem 1rem;
`;
export const ExerciseCard = ({
  data,
  setExercisePage,
  setEditExercise,
}: ExerciseCardType) => {
  return (
    <ExerciseCardContainer>
      <ExerciseCardHeader>
        <ExerciseCardTitle>{data.exercise}</ExerciseCardTitle>
        <Line />
        <div className="exerciseCard-top-btnContainer">
          <IconButton
            size="small"
            onClick={() => {
              setEditExercise(data);
              setExercisePage(true);
            }}
            icon={<AiOutlineEdit size="1rem" />}
          />
        </div>
      </ExerciseCardHeader>
      <SetsContainer>
        {data.sets.map((set) => (
          <SetCard key={set.id} data={set} />
        ))}
      </SetsContainer>
    </ExerciseCardContainer>
  );
};
