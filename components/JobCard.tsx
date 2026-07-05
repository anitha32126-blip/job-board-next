"use client";

import { memo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import type { Job } from "../generated/graphql";
import { formatSalary } from "../utils/formatSalary";
import ApplyModal from "./ApplyModal";
import { useAppStore } from "../store/useAppStore";
interface JobCardProps {
  job: Job;
}

function JobCard({ job }: JobCardProps) {
  const [open, setOpen] = useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null);

  const { status } = useSession();

  const router = useRouter();

  const addSavedJob = useAppStore(
    (state) => state.addSavedJob
  );

  const statusColor = {
    open: "green",
    closed: "red",
    draft: "orange",
  };

  function closeModal() {
    setOpen(false);
    buttonRef.current?.focus();
  }

  function handleApply() {
    if (status !== "authenticated") {
      router.push("/login?callbackUrl=/jobs");
      return;
    }

    setOpen(true);
  }

  function handleSaveJob() {
  if (status !== "authenticated") {
    router.push("/login?callbackUrl=/saved");
    return;
  }

  addSavedJob(job);

  router.push("/saved");
}

  return (
    <>
      <div
        style={{
          border: "1px solid gray",
          padding: "16px",
          marginBottom: "12px",
          borderRadius: "8px",
        }}
      >
        <h2>
          <Link href={`/jobs/${job.id}`}>
            {job.title}
          </Link>
        </h2>

        <p>
          <strong>Company:</strong>{" "}
          {job.company.name}
        </p>

        <p>
          <strong>Salary:</strong>{" "}
          {formatSalary(
            job.salaryMin,
            job.salaryMax
          )}
        </p>

        <span
          aria-label={`Status: ${job.status}`}
          style={{
            backgroundColor:
              statusColor[
                job.status as
                  | "open"
                  | "closed"
                  | "draft"
              ],
            color: "white",
            padding: "4px 8px",
            borderRadius: "4px",
          }}
        >
          {job.status}
        </span>

        <div
          style={{
            marginTop: "10px",
            display: "flex",
            gap: "10px",
          }}
        >
          <button
            ref={buttonRef}
            onClick={handleApply}
          >
            Apply
          </button>

          <button onClick={handleSaveJob}>
            Save Job
          </button>
        </div>
      </div>

      <ApplyModal
        isOpen={open}
        onClose={closeModal}
        jobTitle={job.title}
        jobId={job.id}
      />
    </>
  );
}

export default memo(JobCard);