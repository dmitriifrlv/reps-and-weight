import DatePicker from "react-date-picker/dist/entry.nostyle";
import "./DatePicker.scss";
import "./Calendar.scss";
import { AiOutlineCalendar } from "react-icons/ai";
import { useContext } from "react";
import { ThemeContext } from "../../Styles/ThemeContext";
import { useTheme } from "@emotion/react";

type DateInputProps = {
  value: Date;
  onChange: (value: Date) => void;
};
const DateInput = ({ ...props }: DateInputProps) => {
  const { darkMode } = useContext(ThemeContext);
  const theme = useTheme();
  return (
    <DatePicker
      calendarClassName={`customCalendar ${
        darkMode ? "darkCalendar" : "lightCalendar"
      }`}
      calendarIcon={
        <AiOutlineCalendar
          color={darkMode ? theme.colors.light : theme.colors.dark}
          size="1.5rem"
        />
      }
      dayAriaLabel="day"
      monthAriaLabel="month"
      nativeInputAriaLabel="date"
      calendarAriaLabel="Toggle calendar"
      yearAriaLabel="year"
      clearIcon={null}
      className={`customDatePicker ${darkMode ? "darkPicker" : "lightPicker"}`}
      {...props}
    />
  );
};

export { DateInput };
