"use client";
import Select from './Select';
import type { Job } from "../generated/graphql";
type FilterState = {
  type: Job['type'] | '';
  location: string;
};

interface Props {
  search: string;
  onSearchChange: (value: string) => void;

  filters: FilterState;

  onTypeChange: (value: Job['type'] | '') => void;
  onLocationChange: (value: string) => void;

  isPending: boolean;
}

export default function FilterBar({
  search,
  onSearchChange,
  filters,
  onTypeChange,
  onLocationChange,
  isPending,
}: Props) {
  return (
    <div
      style={{
        display: 'flex',
        gap: '10px',
        marginBottom: '20px',
        flexWrap: 'wrap',
      }}
    >
      <div>
        <label htmlFor="job-search">
          Search Jobs
        </label>

        <input
          id="job-search"
          type="text"
          placeholder="Search jobs..."
          value={search}
          onChange={(e) =>
            onSearchChange(e.target.value)
          }
        />
      </div>

      <div>
        <label htmlFor="job-type">
          Job Type
        </label>

        <Select
          id="job-type"
          value={filters.type}
          options={[
            'Full-Time',
            'Part-Time',
            'Remote',
          ]}
          onChange={onTypeChange}
        />
      </div>

      <div>
        <label htmlFor="job-location">
          Location
        </label>

        <Select
          id="job-location"
          value={filters.location}
          options={[
            'Hyderabad',
            'Bangalore',
            'Chennai',
          ]}
          onChange={onLocationChange}
        />
      </div>

      {isPending && (
        <span aria-live="polite">
          Searching...
        </span>
      )}
    </div>
  );
}