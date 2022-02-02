import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState, HTMLInputTypeAttribute } from "react";
import styled from "@emotion/styled";

type InputProps = {
  error?: boolean;
  type?: HTMLInputTypeAttribute;
  placeholder: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const StyledInputContainer = styled.div`
  width: 100%;
  position: relative;
  display: inline-flex;
`;

const StyledInput = styled.input`
  appearance: none;
  font-family: "Baloo Thambi 2";
  font-size: 1.125rem;
  height: 60px;
  width: 100%;
  border-radius: 1rem;
  padding-left: 1rem;
  appearance: none;
  background-color: #232323;
  box-shadow: inset -5px -5px 10px #292828, inset 5px 5px 10px #171717;
  color: #f0f0f0;
  border: 1px solid transparent;
  outline: transparent solid 2px;
  outline-offset: 2px;
  &:focus {
    border-color: rgb(99, 179, 237);
    box-shadow: rgb(99 179 237) 0px 0px 0px 1px;
  }

  &:focus ~ label,
  &:valid ~ label {
    top: 0px;
    font-size: 14px;
    /* color: #90b1f9; */
    color: "#f0f0f0";
    font-weight: 500;
  }
`;

const StyledLabel = styled.label`
  position: absolute;
  pointer-events: none;
  transition: 0.2s ease all;
  left: 16px;
  top: 17px;
  font-size: 1.125rem;
`;

const InputIcon = styled.span`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  margin-right: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

export const NeoInput = ({
  error,
  type = "text",
  placeholder,
  onChange,
  value,
  ...props
}: InputProps) => {
  const [hidePassword, setHidePassword] = useState(true);

  return (
    <StyledInputContainer>
      <StyledInput
        value={value}
        onChange={onChange}
        inputMode={type === "number" ? "decimal" : undefined}
        pattern={type === "number" ? "[0-9]*(.[0-9]+)?" : undefined}
        placeholder={placeholder}
        autoComplete="off"
        autoCorrect="off"
        type={type === "password" ? (hidePassword ? "password" : "text") : type}
        required
      />
      <StyledLabel>{placeholder}</StyledLabel>
      {type === "password" && (
        <InputIcon onClick={() => setHidePassword(!hidePassword)}>
          {hidePassword ? (
            <AiOutlineEyeInvisible
              onClick={() => setHidePassword(false)}
              size="1.5rem"
            />
          ) : (
            <AiOutlineEye size="1.5rem" />
          )}
        </InputIcon>
      )}
    </StyledInputContainer>
  );
};
