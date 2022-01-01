import styled from "@emotion/styled";
import { SetType } from "../../Types/WorkoutTypes";

type SetCardProps = {
  data: SetType;
};

const SetContainer = styled.div`
  font-weight: 500;
  border-radius: 0.5rem;
  // width: 3.75rem;
  min-width: 4rem;
  aspect-ratio: 1/1;
  flex-shrink: 0;
  line-height: 1.25;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 0.5rem;
  box-shadow: -5px -5px 10px #292828, 5px 5px 10px #171717;
  & div {
    display: flex;
  }
`;

export const SetCard = ({ data }: SetCardProps) => {
  const { reps, weight } = data;
  return (
    <SetContainer>
      <div>
        {reps}
        <div> x</div>
      </div>
      <div>{weight}kg</div>
    </SetContainer>
  );
};
