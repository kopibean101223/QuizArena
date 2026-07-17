"use client";

import React from "react";

export interface VoteOptionItem {
  id: string;
  text: string;
}

interface QuizVoteOptionsProps {
  options: VoteOptionItem[];
  selectedOption: string;
  votesCount: number;
  onVote: (id: string) => void;
}

export default function QuizVoteOptions({
  options,
  selectedOption,
  votesCount,
  onVote,
}: QuizVoteOptionsProps) {
  return (
    <div className="space-y-3">
      {options.map((option) => {
        const isSelected = selectedOption === option.id;
        const matchesSampleState = option.id === "B"; // Retains your visual green accent highlight for option B

        return (
          <button
            key={option.id}
            onClick={() => onVote(option.id)}
            className={`w-full flex items-center justify-between p-4 rounded-2xl border text-left transition-all duration-200 ${
              isSelected && matchesSampleState
                ? "border-emerald-500 bg-emerald-50/20 ring-2 ring-emerald-500/10"
                : isSelected
                ? "border-[#483CD8] bg-indigo-50/30 ring-2 ring-[#483CD8]/10"
                : "border-slate-100 hover:border-slate-300 hover:bg-slate-50/50"
            }`}
          >
            <span
              className={`text-xs font-extrabold ${
                isSelected && matchesSampleState
                  ? "text-emerald-800"
                  : "text-slate-700"
              }`}
            >
              {option.id}) {option.text}
            </span>

            {/* Check / Circle badges matching the layout */}
            <div className="flex items-center gap-2">
              {matchesSampleState && (
                <span className="h-5 w-5 rounded-full bg-emerald-500 text-white text-[10px] font-black flex items-center justify-center">
                  {votesCount}
                </span>
              )}
              <div
                className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                  isSelected && matchesSampleState
                    ? "border-emerald-500 text-emerald-500 bg-emerald-50"
                    : isSelected
                    ? "border-[#483CD8] text-[#483CD8] bg-white"
                    : "border-slate-300 bg-white"
                }`}
              >
                {isSelected && (
                  <svg
                    className="h-3 w-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}