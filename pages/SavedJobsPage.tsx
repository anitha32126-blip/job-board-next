"use client";

import Link from "next/link";
import { useAppStore } from "../store/useAppStore";
import { formatSalary } from "../utils/formatSalary";

export default function SavedJobsPage() {
  const savedJobs = useAppStore(
    (state) => state.savedJobs
  );

  const removeSavedJob = useAppStore(
    (state) => state.removeSavedJob
  );

  return (
    <main
      style={{
        padding: "20px",
        maxWidth: "900px",
        margin: "0 auto",
      }}
    >
      <h1
        style={{
          fontSize: "30px",
          fontWeight: "bold",
          marginBottom: "20px",
        }}
      >
        Saved Jobs
      </h1>

      {savedJobs.length === 0 ? (
        <p>No saved jobs yet.</p>
      ) : (
        savedJobs.map((job) => (
          <div
            key={job.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "16px",
              marginBottom: "16px",
            }}
          >
            <h2>
              <Link href={`/jobs/${job.id}`}>
                {job.title}
              </Link>
            </h2>

            <p>
              <strong>Company:</strong> {job.company.name}
            </p>

            <p>
              <strong>Location:</strong> {job.location}
            </p>

            <p>
              <strong>Salary:</strong>{" "}
              {formatSalary(
                job.salaryMin,
                job.salaryMax
              )}
            </p>

            <button
              onClick={() =>
                removeSavedJob(job.id)
              }
              style={{
                marginTop: "10px",
                padding: "8px 14px",
                background: "#dc2626",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Remove
            </button>
          </div>
        ))
      )}
    </main>
  );
}