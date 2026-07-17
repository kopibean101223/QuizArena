"use client";

import React from "react";

export interface QuizOptionItem {
  id: string;
  value: string;
}

interface QuizOptionsProps {
  options: QuizOptionItem[];
  selectedOption: string | null;
  onSelectOption: (id: string) => void;
}

export default function QuizOptions({
  options,
  selectedOption,
  onSelectOption,
}: QuizOptionsProps) {
  return (
    <div className="space-y-3">
      {options.map((option) => {
        const isSelected = selectedOption === option.id;
        return (
          <button
            key={option.id}
            onClick={() => onSelectOption(option.id)}
            className={`w-full flex items-center gap-4 p-4 rounded-2xl border text-left transition-all duration-200 ${
              isSelected
                ? "border-[#483CD8] bg-indigo-50/50 ring-2 ring-[#483CD8]/20"
                : "border-slate-100 hover:border-slate-300 hover:bg-slate-50"
            }`}
          >
            {/* Circle Indicator */}
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border flex-shrink-0 transition-colors ${
                isSelected
                  ? "bg-[#483CD8] border-[#483CD8] text-white"
                  : "border-slate-300 text-slate-500 bg-white"
              }`}
            >
              {option.id}
            </div>
            <span className="text-sm sm:text-base font-extrabold text-slate-700">
              {option.value}
            </span>
          </button>
        );
      })}
    </div>
  );
}