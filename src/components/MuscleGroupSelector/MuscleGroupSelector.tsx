import { useContext } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { ThemeContext } from "../../Styles/ThemeContext";
import { useTheme } from "@emotion/react";

type MyOptionType = { value: string; label: string };

const animatedComponents = makeAnimated();

const options: MyOptionType[] = [
  { value: "Chest", label: "Chest" },
  { value: "Back", label: "Back" },
  { value: "Triceps", label: "Triceps" },
  { value: "Biceps", label: "Biceps" },
  { value: "Shoulders", label: "Shoulders" },
  { value: "ABS", label: "ABS" },
  { value: "Legs", label: "Legs" },
  { value: "Glutes", label: "Glutes" },
  { value: "Calves", label: "Calves" },
];

type MuscleGroupSelectorProps = {
  showMuscleGroups: string[];
  onChange?: (value: MyOptionType | any) => void;
};

export default function MuscleGroupSelector({
  showMuscleGroups,
  ...props
}: MuscleGroupSelectorProps) {
  const { darkMode } = useContext(ThemeContext);
  const theme = useTheme();
  const customStyles = {
    container: (provided: {}, state: {}) => ({
      ...provided,
      height: "100%",
    }),
    control: (provided: {}, state: {}) => ({
      ...provided,
      minHeight: "3.5rem",
      height: "100%",
      borderRadius: "1rem",
      background: darkMode ? theme.colors.dark : theme.colors.light,
      border: "none",
      boxShadow: darkMode
        ? theme.shadows.dark.bsDarkInset
        : theme.shadows.light.bsLightInset,
      transition: "background 0ms",
    }),
    menu: (provided: {}, state: {}) => ({
      ...provided,
      background: darkMode ? theme.colors.dark : theme.colors.light,
    }),
    option: (provided: {}, state: any) => ({
      ...provided,
      color: state.isDisabled
        ? state.theme.colors.neutral20
        : state.isSelected
        ? state.theme.colors.neutral0
        : state.isFocused
        ? darkMode
          ? theme.colors.dark
          : "inherit"
        : "inherit",
    }),
    valueContainer: (provided: {}, state: {}) => ({
      ...provided,
      paddingLeft: "1rem",
    }),
    multiValueRemove: (provided: {}, state: any) => ({
      ...provided,
      color: darkMode ? theme.colors.dark : "inherit",
    }),
    input: (provided: {}, state: any) => ({
      ...provided,
      color: darkMode ? theme.colors.light : "inherit",
    }),
  };

  return (
    <Select
      value={options.filter((option) =>
        showMuscleGroups.includes(option.label)
      )}
      isSearchable={true}
      components={animatedComponents}
      styles={customStyles}
      isMulti
      options={options}
      {...props}
    />
  );
}
