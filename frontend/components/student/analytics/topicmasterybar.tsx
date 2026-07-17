"use client";

import React from "react";

interface TopicMasteryBarProps {
  name: string;
  percentage: number;
  barColor?: string;
}

export default function TopicMasteryBar({
  name,
  percentage,
  barColor = "bg-emerald-500",
}: TopicMasteryBarProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs font-bold">
        <span className="text-slate-600">{name}</span>
        <span className="text-slate-800 font-extrabold">{percentage}%</span>
      </div>
      {/* Slider channel track */}
      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div 
          className={`h-full ${barColor} rounded-full transition-all duration-500`} 
          style={{ width: `${percentage}%` }} 
        />
      </div>
    </div>
  );
}