"use client";

import { useState } from "react";
import { fetchStage } from "@/lib/api";
import StageBadge from "@/components/StageBadge";
import CandlestickChart from "@/components/CandlestickChart";

export default function Home() {
  const [symbol, setSymbol] = useState("");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function analyze() {
    try {
      setLoading(true);
      setError("");
      const res = await fetchStage(symbol);
      setData(res);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  // Remove OHLCV from JSON display
  const jsonWithoutOHLCV = data
    ? (() => {
        const { ohlcv, ...rest } = data;
        return rest;
      })()
    : null;

  return (
    <main className="max-w-6xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">CSE Stage Detection</h1>

      {/* Input */}
      <div className="flex gap-3">
        <input
          value={symbol}
          onChange={e => setSymbol(e.target.value)}
          placeholder="Company Symbol"
          className="border px-3 py-2 rounded w-64"
        />
        <button
          onClick={analyze}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Analyze
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {data && (
        <>
          {/* Stage Highlight */}
          <div className="flex gap-2">
            <StageBadge label="Stage 1" active={data.current_stage === 1} />
            <StageBadge label="Stage 2" active={data.current_stage === 2} />
            <StageBadge label="Stage 3" active={data.current_stage === 3} />
            <StageBadge label="Stage 4" active={data.current_stage === 4} />
          </div>

          {/* Summary */}
          <div className="grid grid-cols-2 gap-4">
            <div className="border rounded p-4">
              <h3 className="font-semibold mb-2">Current</h3>
              <p>Stage: {data.current_stage}</p>
              <p>Substage: {data.current_substage}</p>
            </div>

            <div className="border rounded p-4">
              <h3 className="font-semibold mb-2">Previous</h3>
              <p>Stage: {data.last_stage}</p>
              <p>
                {data.last_stage_started} → {data.last_stage_ended}
              </p>
            </div>
          </div>

          {/* Candlestick Chart */}
          <CandlestickChart data={data.ohlcv} />

          {/* JSON Viewer (NO OHLCV) */}
          <div className="bg-gray-900 text-green-200 p-4 rounded text-sm overflow-auto">
            <pre>{JSON.stringify(jsonWithoutOHLCV, null, 2)}</pre>
          </div>
        </>
      )}
    </main>
  );
}
