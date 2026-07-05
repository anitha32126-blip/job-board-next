export function formatSalary(
  min: number,
  max: number
): string {
  return `₹${min.toLocaleString()} - ₹${max.toLocaleString()}`;
}