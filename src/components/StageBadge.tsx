"use client";

export default function StageBadge({
  label,
  active,
}: {
  label: string;
  active: boolean;
}) {
  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-semibold ${
        active
          ? "bg-emerald-600 text-white"
          : "bg-gray-200 text-gray-600"
      }`}
    >
      {label}
    </span>
  );
}
