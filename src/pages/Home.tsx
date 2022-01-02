import React from "react";
import { Calendar } from "../components/Calendar/Calendar";
import { Layout } from "../components/Layout";
import { useGetUserInfoQuery } from "../app/service";

export const Home = () => {
  const { isSuccess, data, error, isLoading } = useGetUserInfoQuery();
  return (
    <Layout>
      {error ? (
        <p>There was an error</p>
      ) : isLoading ? (
        <p>Warming up ...</p>
      ) : isSuccess ? (
        <Calendar workouts={data.workouts} />
      ) : null}
    </Layout>
  );
};
