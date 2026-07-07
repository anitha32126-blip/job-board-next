import { gql } from "@apollo/client";
import { client } from "../client";

import JobList from "./JobList";

import type { GetJobsQuery } from "../generated/graphql";

const GET_JOBS = gql`
  query GetJobs {
    jobs {
      id
      title
      type
      location
      salaryMin
      salaryMax
      status
      company {
        id
        name
        location
      }
    }
  }
`;

export default async function JobListServer() {
  const { data } = await client.query<GetJobsQuery>({
    query: GET_JOBS,
    fetchPolicy: "no-cache",
  });

  if (!data) {
    return <JobList jobs={[]} />;
  }

  return <JobList jobs={data.jobs} />;
}