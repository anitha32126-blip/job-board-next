"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@apollo/client/react";

import { GetJobDocument } from "../generated/graphql";
import { useAppStore } from "../store/useAppStore";
import Skeleton from "../components/Skeleton";

export default function JobDetailPage() {
  const params = useParams();

  const id =
    typeof params?.id === "string"
      ? params.id
      : Array.isArray(params?.id)
      ? params.id[0]
      : "";

  const setLastViewedJob = useAppStore(
    (state) => state.setLastViewedJob
  );

  const { data, loading, error } = useQuery(GetJobDocument, {
    variables: {
      id,
    },
    skip: !id,
  });

  useEffect(() => {
    if (data?.job) {
      setLastViewedJob(data.job);
    }
  }, [data, setLastViewedJob]);

  if (loading) {
    return <Skeleton />;
  }

  if (error) {
    return <h2>{error.message}</h2>;
  }

  if (!data?.job) {
    return <h2>Job not found</h2>;
  }

  const job = data.job;

  return (
    <div style={{ padding: "20px" }}>
      <h1>{job.title}</h1>

      <p>
        <strong>Company:</strong> {job.company.name}
      </p>

      <p>
        <strong>Location:</strong> {job.company.location}
      </p>

      <p>
        <strong>Salary:</strong> ₹{job.salaryMin} - ₹{job.salaryMax}
      </p>

      <p>
        <strong>Status:</strong> {job.status}
      </p>

      <p>
        <strong>Type:</strong> {job.type}
      </p>
    </div>
  );
}