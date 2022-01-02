import styled from "@emotion/styled";
import { useContext } from "react";
import { ThemeContext } from "../../Styles/ThemeContext";
import { DayPicker } from "react-day-picker";
import { CardProps } from "../../Types/StyledElementsTypes";
import enGb from "date-fns/locale/en-GB";
import { WorkoutDataType } from "../../Types/WorkoutTypes";
import { FaDumbbell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import calendarClassNames from "./Calendar.module.css";

type CalendarProps = {
  workouts: WorkoutDataType[];
};

const CalendarCard = styled.div<CardProps>`
  box-shadow: ${({ darkMode, theme }) =>
    darkMode ? theme.shadows.dark.bsDark : theme.shadows.light.bsLight};
  transition: box-shadow 0.2s ease;
  border-radius: 1rem;
  // height: 100%;
  @media (max-width: 768px) {
    border-radius: 0;
  }
`;

const CalendarContainer = styled.div`
  label: calendarContainer;
  height: 100%;
  width: 100%;
  padding: 2rem;
  @media (max-width: 768px) {
    padding: 0;
    width: 100%;
  }
`;

export const Calendar = ({ workouts }: CalendarProps) => {
  console.log(workouts);
  const { darkMode } = useContext(ThemeContext);
  const navigate = useNavigate();
  const formatDay = (day: Date) => {
    const date = day.getDate();
    const month = day.getMonth();
    const year = day.getFullYear();

    const foundWorkoutDay = workouts.filter((workout: WorkoutDataType) => {
      const workoutDate = new Date(workout.date);
      return (
        workoutDate.getDate() === date &&
        workoutDate.getMonth() === month &&
        workoutDate.getFullYear() === year
      );
    });

    const setNewDate = () => {
      localStorage.setItem("date", JSON.stringify(day));
      navigate("/workout/add");
    };

    return (
      <>
        {foundWorkoutDay?.length > 0 ? (
          <div>
            {foundWorkoutDay?.map((i) => (
              <div onClick={() => navigate(`/workout/${i._id}`)} key={i._id}>
                <p className="calendarDate">{date}</p>
                <div className="workoutDate">
                  <FaDumbbell />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <div className="calendarDate" onClick={setNewDate}>
              {date}
            </div>
          </div>
        )}
      </>
    );
  };

  return (
    <CalendarContainer>
      <CalendarCard darkMode={darkMode}>
        <DayPicker
          locale={enGb}
          formatters={{ formatDay }}
          classNames={calendarClassNames}
        />
      </CalendarCard>
    </CalendarContainer>
  );
};
