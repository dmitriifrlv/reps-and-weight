import React from "react";
import { Calendar } from "../components/Calendar/Calendar";
import { Layout } from "../components/Layout";
export const Home = () => {
  return (
    <Layout>
      <Calendar workouts={[]} />
    </Layout>
  );
};
