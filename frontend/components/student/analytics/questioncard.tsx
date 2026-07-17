"use client";

import React, { useState } from "react";

export interface QuestionData {
  id: string;
  topic: string;
  questionText: string;
  yourAnswer: string;
  correctAnswer?: string;
  isCorrect: boolean;
  points: number;
  timeSpent: string;
  avgTime: string;
  difficulty: "Easy" | "Medium" | "Hard";
  explanation: string;
}

interface QuestionCardProps {
  question: QuestionData;
}

export default function QuestionCard({ question }: QuestionCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      className={`bg-white rounded-2xl border transition-all overflow-hidden ${
        question.isCorrect 
          ? "border-slate-100 shadow-sm" 
          : "border-l-4 border-l-red-500 border-y-slate-100 border-r-slate-100 shadow-sm"
      }`}
    >
      <div className="p-5 sm:p-6 space-y-4">
        {/* Top Header info row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Status Icon */}
            <div className={`h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0 ${
              question.isCorrect ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"
            }`}>
              {question.isCorrect ? (
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </div>
            <span className="text-[10px] font-black text-slate-400 tracking-wider">
              {question.id} • {question.topic}
            </span>
          </div>

          {/* Points Badge */}
          <span className={`px-2.5 py-0.5 rounded text-[10px] font-black ${
            question.isCorrect ? "bg-indigo-50 text-indigo-600" : "bg-slate-100 text-slate-400"
          }`}>
            {question.isCorrect ? `+${question.points} pts` : "0 pts"}
          </span>
        </div>

        {/* Question Text */}
        <h3 className="text-sm sm:text-base font-extrabold text-slate-800 leading-snug">
          {question.questionText}
        </h3>

        {/* Answer blocks grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className={`p-3 rounded-xl border text-xs font-bold ${
            question.isCorrect ? "bg-slate-50/50 border-slate-100 text-slate-600" : "bg-red-50/30 border-red-100 text-red-600"
          }`}>
            <span className="text-[9px] font-black tracking-wider uppercase text-slate-400 block mb-1">
              Your Answer
            </span>
            <span className={!question.isCorrect ? "line-through" : ""}>
              {question.yourAnswer}
            </span>
          </div>

          {!question.isCorrect && question.correctAnswer && (
            <div className="p-3 rounded-xl border border-emerald-100 bg-emerald-50/20 text-emerald-700 text-xs font-bold">
              <span className="text-[9px] font-black tracking-wider uppercase text-slate-400 block mb-1">
                Correct Answer
              </span>
              {question.correctAnswer}
            </div>
          )}
        </div>

        {/* Action Footer bar */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-50/80 text-[11px] font-bold text-slate-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {question.timeSpent} <span className="font-medium text-slate-300">(Avg: {question.avgTime})</span>
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z" />
              </svg>
              {question.difficulty}
            </span>
          </div>

          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            Explanation
            <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Collapsible Explanation Text */}
      {isExpanded && (
        <div className="bg-[#F3F4FE]/45 px-5 py-4 border-t border-slate-100 text-xs font-semibold leading-relaxed text-slate-500">
          <strong className="text-slate-700 block mb-1">Explanation:</strong>
          {question.explanation}
        </div>
      )}
    </div>
  );
}