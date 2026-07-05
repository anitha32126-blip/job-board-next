"use client";

import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";

const APPLY_TO_JOB = gql`
  mutation ApplyToJob($input: ApplyInput!) {
    applyToJob(input: $input) {
      success
      message
    }
  }
`;

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.email("Invalid email"),
  coverLetter: z
    .string()
    .min(10, "Cover Letter must be at least 10 characters"),
});

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
  jobTitle: string;
  jobId: string;
}

export default function ApplyModal({
  isOpen,
  onClose,
  jobTitle,
  jobId,
}: Props) {
  const modalRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    coverLetter: "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof FormData, string>>
  >({});

  const [applied, setApplied] = useState(false);

  const [applyToJob] = useMutation(APPLY_TO_JOB);

  useEffect(() => {
    if (!isOpen) return;

    firstInputRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () =>
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
  }, [isOpen]);

  function handleClose() {
    setApplied(false);

    setForm({
      name: "",
      email: "",
      coverLetter: "",
    });

    setErrors({});
    onClose();
  }

  if (!isOpen) return null;

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    const result = schema.safeParse(form);

    if (!result.success) {
      const fieldErrors: Partial<
        Record<keyof FormData, string>
      > = {};

      result.error.issues.forEach((issue) => {
        const key = issue.path[0] as keyof FormData;
        fieldErrors[key] = issue.message;
      });

      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setApplied(true);

    try {
      await applyToJob({
        variables: {
          input: {
            jobId,
            name: form.name,
            email: form.email,
            coverLetter: form.coverLetter,
          },
        },

        optimisticResponse: {
          applyToJob: {
            success: true,
            message: "Applied Successfully",
            __typename: "ApplicationResponse",
          },
        },
      });

      alert(
        `Application submitted for ${jobTitle}`
      );

      handleClose();
    } catch {
      setApplied(false);
      alert("Application failed");
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="apply-title"
      className="fixed inset-0 bg-black/50 flex items-center justify-center"
    >
      <div
        ref={modalRef}
        className="bg-white rounded-xl p-6 w-[420px] shadow-xl"
      >
        <h2
          id="apply-title"
          className="text-2xl font-semibold mb-5"
        >
          Apply for {jobTitle}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block mb-1 font-medium"
            >
              Name
            </label>

            <input
              id="name"
              ref={firstInputRef}
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
              className="w-full border border-gray-300 rounded-md p-2"
            />

            {errors.name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.name}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block mb-1 font-medium"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
              className="w-full border border-gray-300 rounded-md p-2"
            />

            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="coverLetter"
              className="block mb-1 font-medium"
            >
              Cover Letter
            </label>

            <textarea
              id="coverLetter"
              rows={5}
              value={form.coverLetter}
              onChange={(e) =>
                setForm({
                  ...form,
                  coverLetter: e.target.value,
                })
              }
              className="w-full border border-gray-300 rounded-md p-2"
            />

            {errors.coverLetter && (
              <p className="text-red-500 text-sm mt-1">
                {errors.coverLetter}
              </p>
            )}
          </div>

          <div className="mt-5 flex gap-3">
            <button
              type="submit"
              disabled={applied}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
            >
              {applied ? "Applied" : "Submit"}
            </button>

            <button
              type="button"
              onClick={handleClose}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}