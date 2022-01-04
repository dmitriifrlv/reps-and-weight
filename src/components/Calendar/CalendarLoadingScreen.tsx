import ContentLoader, { Facebook } from "react-content-loader";
import styled from "@emotion/styled";

const Container = styled.div`
  label: calendarContainer;
  height: calc(100vh - 10rem - 6px);
  width: 100%;
  padding: 2rem;
  & > svg {
    height: 100%;
    width: 100%;
    border-radius: 16px;
  }
  @media (max-width: 768px) {
    padding: 0;
    width: 100%;
    & > svg {
      height: 100%;
      width: 100%;
      border-radius: 0 0 16px 16px;
    }
  }
`;

export const CalendarLoadingScreen = () => {
  return (
    <Container>
      <ContentLoader backgroundColor={"#2e2e2e"} foregroundColor={"#575757"}>
        <rect x="0" y="0" rx="0" ry="0" width="100%" height="100%" />
      </ContentLoader>
    </Container>
  );
};
