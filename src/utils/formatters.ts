export function formatFollowers(count: number | undefined | null): string {
  if (count == null || isNaN(count)) return "0";
  if (count >= 1000000) {
    return (count / 1000000).toFixed(1) + "M";
  }
  if (count >= 1000) {
    return (count / 1000).toFixed(1) + "K";
  }
  return count.toString();
}

export function formatEngagementRate(rate: number | undefined | null): string {
  if (rate == null || isNaN(rate)) return "N/A";
  return (rate * 100).toFixed(2) + "%";
}

export function formatNumber(num: number | undefined | null): string {
  if (num == null || isNaN(num)) return "N/A";
  return num.toLocaleString();
}

