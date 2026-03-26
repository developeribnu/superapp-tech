export function formatTokenCount(tokens: number): string {
  if (tokens >= 1_000_000) return `${(tokens / 1_000_000).toFixed(1)}M`;
  if (tokens >= 1_000) return `${(tokens / 1_000).toFixed(0)}K`;
  return tokens.toString();
}

export function formatPrice(price: number | null): string {
  if (price === null) return "N/A";
  if (price === 0) return "Free";
  return `$${price.toFixed(2)}`;
}

export function formatPercentage(value: number | undefined): string {
  if (value === undefined) return "\u2014";
  return `${value.toFixed(1)}%`;
}

export function formatElo(value: number | undefined): string {
  if (value === undefined) return "\u2014";
  return value.toFixed(0);
}

export function estimateMonthlyCost(
  inputTokensPerDay: number,
  outputTokensPerDay: number,
  inputPricePer1M: number,
  outputPricePer1M: number
): number {
  const days = 30;
  const inputCost = ((inputTokensPerDay * days) / 1_000_000) * inputPricePer1M;
  const outputCost =
    ((outputTokensPerDay * days) / 1_000_000) * outputPricePer1M;
  return inputCost + outputCost;
}
