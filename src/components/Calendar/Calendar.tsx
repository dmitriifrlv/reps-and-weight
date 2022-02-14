import styled from "@emotion/styled";
import { useContext, useState } from "react";
import { ThemeContext } from "../../Styles/ThemeContext";
import { DayPicker } from "react-day-picker";
import { CardProps } from "../../Types/StyledElementsTypes";
import enGb from "date-fns/locale/en-GB";
import { WorkoutDataType } from "../../Types/WorkoutTypes";
import { FaDumbbell, FaPlus } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import calendarClassNames from "./Calendar.module.css";
import { Modal } from "@mantine/core";

const WorkoutCell = styled.div`
  label: WorkoutCell;
  width: 100%;
  height: 100%;
`;

type CalendarProps = {
  workouts: WorkoutDataType[];
};

const CalendarCard = styled.div<CardProps>`
  box-shadow: ${({ darkMode, theme }) =>
    darkMode ? theme.shadows.dark.bsDark : theme.shadows.light.bsLight};
  transition: box-shadow 0.2s ease;
  border-radius: 1rem;
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

const CalendarCell = styled.div`
  cursor: pointer;
  width: 100%;
  height: 100%;
  .addNewWorkout {
    display: none;
  }
  &:hover {
    background: #3d3d3d;
    .addNewWorkout {
      display: flex;
    }
  }
`;

const CalendarDate = styled.p``;

const WorkoutIconContainer = styled.div`
  height: calc(100% - 24px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Calendar = ({ workouts }: CalendarProps) => {
  const { darkMode } = useContext(ThemeContext);
  const [open, setOpen] = useState(false);
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
      navigate("/workout");
    };
    switch (foundWorkoutDay.length) {
      case 0:
        return (
          <CalendarCell onClick={setNewDate}>
            {date}
            {
              <WorkoutIconContainer>
                <FaPlus className="addNewWorkout" />
              </WorkoutIconContainer>
            }
          </CalendarCell>
        );
      case 1:
        return (
          <WorkoutCell
            onClick={() => navigate(`/workout/${foundWorkoutDay[0]._id}`)}
          >
            <CalendarCell key={foundWorkoutDay[0]._id}>
              <CalendarDate className="calendarDate">{date}</CalendarDate>

              <WorkoutIconContainer>
                <FaDumbbell color="#b43919" />
              </WorkoutIconContainer>
            </CalendarCell>
          </WorkoutCell>
        );
      default:
        return (
          <>
            <WorkoutCell onClick={() => setOpen(true)}>
              <CalendarCell>
                <CalendarDate className="calendarDate">{date}</CalendarDate>
                <WorkoutIconContainer>
                  <FaDumbbell color="#b43919" />
                </WorkoutIconContainer>
              </CalendarCell>
            </WorkoutCell>
            <Modal
              classNames={{
                title: "text-xl",
              }}
              opened={open}
              onClose={() => setOpen(false)}
              title="Choose a workout:"
            >
              {foundWorkoutDay.map((workout, index) => {
                return (
                  <Link
                    to={`/workout/${workout._id}`}
                    key={workout._id}
                    className="modalLink"
                  >
                    Muscle Groups:{" "}
                    {workout.muscleGroups.map((muscleGroup) => (
                      <span>{muscleGroup}, </span>
                    ))}
                  </Link>
                );
              })}
            </Modal>
          </>
        );
    }
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
