export async function fetchStage(symbol: string) {
  const res = await fetch(`https://wave-pattern-detection.onrender.com/stage/${symbol}`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
