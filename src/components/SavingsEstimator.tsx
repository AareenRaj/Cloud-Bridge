"use client";

import { useState } from "react";
import Card from "@/components/Card";

// Illustrative assumption, not a guarantee. Replace with your own
// numbers once you have real case results.
const LOW = 0.15;
const HIGH = 0.3;

const rupees = (n: number) => "₹" + Math.round(n).toLocaleString("en-IN");

export default function SavingsEstimator() {
  const [bill, setBill] = useState(500000);

  return (
    <Card className="p-8">
      <h2 className="text-2xl font-bold">Estimate your savings</h2>
      <p className="mt-2 text-slate-300">
        Move the slider to your monthly AWS or Google Cloud bill.
      </p>

      <label htmlFor="bill" className="mt-6 block font-medium">
        Monthly cloud bill: <span className="text-brand">{rupees(bill)}</span>
      </label>
      <input
        id="bill"
        type="range"
        min={50000}
        max={5000000}
        step={50000}
        value={bill}
        onChange={(event) => setBill(Number(event.target.value))}
        className="mt-3 w-full accent-teal-400"
      />

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-edge p-4">
          <p className="text-sm text-slate-400">Possible monthly saving</p>
          <p className="mt-1 text-xl font-bold" aria-live="polite">
            {rupees(bill * LOW)} to {rupees(bill * HIGH)}
          </p>
        </div>
        <div className="rounded-xl border border-edge p-4">
          <p className="text-sm text-slate-400">Possible yearly saving</p>
          <p className="mt-1 text-xl font-bold" aria-live="polite">
            {rupees(bill * LOW * 12)} to {rupees(bill * HIGH * 12)}
          </p>
        </div>
      </div>

      <p className="mt-4 text-sm text-amber-300">
        Illustrative estimate using a 15% to 30% range. Real savings depend on
        your setup.
      </p>
    </Card>
  );
}