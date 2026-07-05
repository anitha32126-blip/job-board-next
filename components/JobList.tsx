"use client";
import type { Job } from "../generated/graphql";
import JobCard from './JobCard';

interface JobListProps {
  jobs: Job[];
}

export default function JobList({
  jobs,
}: JobListProps) {
  return (
    <div
      className="
        grid
        grid-cols-1
        md:grid-cols-2
        lg:grid-cols-3
        gap-4
      "
    >
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
        />
      ))}
    </div>
  );
}