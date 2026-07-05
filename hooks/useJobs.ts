"use client";

import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import type { GetJobsQuery } from "../generated/graphql";

const GET_JOBS = gql`
  query GetJobs {
    jobs {
      id
      title
      salaryMin
      salaryMax
      status
      type
      location
      company {
        id
        name
        location
      }
    }
  }
`;

export function useJobs() {
  const { data, loading, error } =
    useQuery<GetJobsQuery>(GET_JOBS);

  return {
    jobs: (data?.jobs ?? []).filter(
      (job): job is NonNullable<typeof job> =>
        job !== null
    ),
    loading,
    error: error?.message ?? "",
  };
}