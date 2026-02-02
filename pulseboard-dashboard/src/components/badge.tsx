interface BadgeProps {
  variant: "Active" | "Inactive";
}

export function Badge({ variant }: BadgeProps) {
  const styles =
    variant === "Active"
      ? "bg-green-100 text-green-700"
      : "bg-gray-300 text-gray-600";

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-medium ${styles}`}>
      {variant}
    </span>
  );
}
