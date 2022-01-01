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
  font-family: inherit;
  font-size: 1.125rem;
  height: 60px;
  width: 100%;
  border-radius: 1rem;
  padding-left: 1rem;
  border: none;
  outline: none;
  appearance: none;
  background-color: #232323;
  box-shadow: inset -5px -5px 10px #292828, inset 5px 5px 10px #171717;
  border: none;
  color: #f0f0f0;

  &:focus {
    outline: 1px solid rgb(73, 73, 73);
  }
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
        pattern={type === "number" ? "[0-9]*(.[0-9]+)?" : ""}
        placeholder={placeholder}
        autoComplete="off"
        autoCorrect="off"
        type={type === "password" ? (hidePassword ? "password" : "text") : type}
      />
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
