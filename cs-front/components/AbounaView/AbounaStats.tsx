import React from "react";
import { AbounaChart } from "../custom/AbounaChart";
import { AbounaMonthlyBarChart } from "../custom/AbounaMonthlyChart";

export default function AbounaStats() {
  return (
    <div className="pt-[16px] ml-4 flex flex-col gap-5 mb-4">
      <AbounaChart />
      <AbounaMonthlyBarChart />
    </div>
  );
}
