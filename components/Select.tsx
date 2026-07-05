interface SelectProps<T extends string> {
  value: T | '';
  options: T[];
  onChange: (
    value: T | ''
  ) => void;

  id?: string;
}

export default function Select<
  T extends string
>({
  value,
  options,
  onChange,
  id,
}: SelectProps<T>) {
  return (
    <select
      id={id}
      value={value}
      onChange={(e) =>
        onChange(
          e.target.value as
            | T
            | ''
        )
      }
    >
      <option value="">
        All
      </option>

      {options.map((option) => (
        <option
          key={option}
          value={option}
        >
          {option}
        </option>
      ))}
    </select>
  );
}