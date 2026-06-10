export function formatCount(value: number): string {
  if (value < 1000) {
    return String(value);
  }

  if (value < 1_000_000) {
    const formatted = (value / 1000).toFixed(value < 10_000 ? 1 : 0);
    return `${formatted.replace(/\.0$/, "")}K`;
  }

  const formatted = (value / 1_000_000).toFixed(1);
  return `${formatted.replace(/\.0$/, "")}M`;
}

export function formatRelativeTime(value: string | number): string {
  const timestamp =
    typeof value === "number"
      ? value > 1_000_000_000_000
        ? value
        : value * 1000
      : new Date(value).getTime();

  if (Number.isNaN(timestamp)) {
    return "";
  }

  const diffMs = Date.now() - timestamp;
  const minutes = Math.floor(diffMs / 60_000);

  if (minutes < 1) {
    return "Just now";
  }

  if (minutes < 60) {
    return `${minutes}m`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours}h`;
  }

  const days = Math.floor(hours / 24);
  if (days < 7) {
    return `${days}d`;
  }

  return new Date(timestamp).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}
