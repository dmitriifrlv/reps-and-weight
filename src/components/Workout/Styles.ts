import styled from "@emotion/styled";
import { CardProps } from "../../Types/StyledElementsTypes";

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
  width: 80%;
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

export {
  InputContainer,
  WorkoutContainer,
  WorkoutCard,
  WorkoutHeader,
  ExercisesContainer,
  BtnBlock,
};
