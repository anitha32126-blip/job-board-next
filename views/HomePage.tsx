"use client";

import {
  useMemo,
  useState,
  useTransition,
} from "react";

import { useDebouncedValue } from "../hooks/useDebouncedValue";

import Header from "../components/Header";
import JobList from "../components/JobList";
import Skeleton from "../components/Skeleton";
import FilterBar from "../components/FilterBar";

import { useJobs } from "../hooks/useJobs";

import { useAppStore } from "../store/useAppStore";

import type { GetJobsQuery } from "../generated/graphql";

type Job = GetJobsQuery["jobs"][number];

export default function HomePage() {
  const {
    jobs,
    loading,
    error,
  } = useJobs();

  const savedJobs = useAppStore(
    (state) => state.savedJobs
  );

  const showFilters = useAppStore(
    (state) => state.filterOpen
  );

  const setShowFilters = useAppStore(
    (state) => state.setFilterOpen
  );

  const [search, setSearch] =
    useState("");

  const [
    isPending,
    startTransition,
  ] = useTransition();

  const debouncedSearch =
    useDebouncedValue(search, 500);

  const [filters, setFilters] =
    useState<{
      type: Job["type"] | "";
      location: string;
    }>({
      type: "",
      location: "",
    });

  const filteredJobs =
    useMemo(() => {
      return jobs
        .filter((job) => {
          const matchesSearch =
            job.title
              .toLowerCase()
              .includes(
                debouncedSearch.toLowerCase()
              );

          const matchesType =
            !filters.type ||
            job.type === filters.type;

          const matchesLocation =
            !filters.location ||
            job.location ===
              filters.location;

          return (
            matchesSearch &&
            matchesType &&
            matchesLocation
          );
        })
        .sort((a, b) =>
          a.title.localeCompare(
            b.title
          )
        );
    }, [
      jobs,
      debouncedSearch,
      filters,
    ]);

  if (loading) {
    return <Skeleton />;
  }

  if (error) {
    return (
      <h2 className="text-red-500 p-6">
        {error}
      </h2>
    );
  }

  return (
    <main
      id="main-content"
      className="min-h-screen bg-background text-foreground p-6"
    >
      <Header
        savedCount={savedJobs.length}
      />

      <button
        aria-label="Toggle Filters"
        onClick={() =>
          setShowFilters(!showFilters)
        }
        className="md:hidden border rounded px-3 py-2 mb-4"
      >
        ☰ Filters
      </button>

      <div className="hidden md:block mb-6">
        <FilterBar
          search={search}
          isPending={isPending}
          filters={filters}
          onSearchChange={(value) =>
            startTransition(() =>
              setSearch(value)
            )
          }
          onTypeChange={(value) =>
            setFilters({
              ...filters,
              type: value,
            })
          }
          onLocationChange={(value) =>
            setFilters({
              ...filters,
              location: value,
            })
          }
        />
      </div>

      {showFilters && (
        <div className="md:hidden mb-6">
          <FilterBar
            search={search}
            isPending={isPending}
            filters={filters}
            onSearchChange={(value) =>
              startTransition(() =>
                setSearch(value)
              )
            }
            onTypeChange={(value) =>
              setFilters({
                ...filters,
                type: value,
              })
            }
            onLocationChange={(value) =>
              setFilters({
                ...filters,
                location: value,
              })
            }
          />
        </div>
      )}

      <p className="mb-5 text-lg font-medium">
        {filteredJobs.length} jobs found
      </p>

      <JobList jobs={filteredJobs} />
    </main>
  );
}