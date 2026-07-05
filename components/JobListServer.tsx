import { gql } from "@apollo/client";
import { client } from "../../client";

import JobList from "../../components/JobList";

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
  const { data } = await client.query({
    query: GET_JOBS,
    fetchPolicy: "no-cache",
  });

  return <JobList jobs={data.jobs} />;
}