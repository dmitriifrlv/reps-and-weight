import React from "react";
import styled from "@emotion/styled";
import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Demo } from "../images/Demo.svg";

const LandingContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

const ImageContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  svg {
    height: 80%;
  }
`;
const TextContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
  padding: 16px;
  main {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  p {
    font-size: 1.25rem;
  }

  h1 {
    font-size: 2.5rem;
  }
`;

export const Landing = () => {
  const navigate = useNavigate();
  return (
    <LandingContainer>
      <TextContainer>
        <h1>Reps & Weight</h1>
        <main>
          <p>Got tired of carrying printed fitness journals to the gym?</p>
          <p>
            <strong>Reps & Weghts</strong> is a no-frills fitness tracker in
            your pocket which allows you to simply keep track of your workout
            routine. Creating a new workout takes just 3 steps - select a date,
            choose muscle groups and add your exercises. The app is especially
            convenient to use from mobile devices.
          </p>
          <p>Have a great workout!</p>
        </main>

        <Button
          size="xl"
          color="indigo"
          radius="md"
          onClick={() => navigate("/login")}
          sx={{
            background: "#b43919",
            transition: "background 0.15s ease",
            "&:hover": {
              background: "#e0451f",
            },
          }}
        >
          Create Account
        </Button>
      </TextContainer>
      <ImageContainer>
        <Demo />
      </ImageContainer>
    </LandingContainer>
  );
};
