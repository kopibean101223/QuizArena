"use client";

import React, { useState } from "react";
import Navbar from '@/components/student/navbar';
import Footer from '@/components/student/footer';

// Clean UI Component imports
import MetricCard, { MetricDetail } from '@/components/student/analytics/metriccard';
import QuestionCard, { QuestionData } from '@/components/student/analytics/questioncard';
import TopicMasteryBar from '@/components/student/analytics/topicmasterybar';

export default function AnalyticsDashboard() {
  const [activeQuestionTab, setActiveQuestionTab] = useState<"all" | "incorrect">("all");

  // Local static dashboard datasets
  const metricsData = [
    {
      title: "TOTAL SCORE",
      value: "2,450",
      badge: "+450 pt Bonus",
      badgeColor: "text-[#10B981] bg-[#ECFDF5]",
      iconBgClassName: "bg-indigo-50",
      icon: (
        <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      details: [
        { label: "Base:", value: "2000", valueColor: "text-slate-600" },
        { label: "Accuracy:", value: "+250", valueColor: "text-emerald-500" },
        { label: "Speed:", value: "+200", valueColor: "text-emerald-500" },
      ] as MetricDetail[],
    },
    {
      title: "ACCURACY",
      value: "85%",
      badge: "17 of 20 Correct",
      badgeColor: "text-slate-500 bg-slate-100",
      iconBgClassName: "bg-emerald-50",
      icon: (
        <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      progressBarValue: 85,
    },
    {
      title: "CLASS RANK",
      value: "Top 8%",
      badge: "↑ 2.5%",
      badgeColor: "text-emerald-600 bg-emerald-50",
      iconBgClassName: "bg-indigo-50",
      icon: (
        <svg className="w-5 h-5 text-[#3B30D1]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      caption: "Moved up 5 positions since last battle.",
    },
    {
      title: "XP EARNED",
      value: "+1,200",
      iconBgClassName: "bg-amber-50",
      icon: (
        <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.907c.961 0 1.36 1.252.586 1.813l-3.974 2.856a1 1 0 00-.342 1.11l1.519 4.674c.3.922-.755 1.688-1.538 1.11L12.75 16.18a1 1 0 00-1.175 0l-3.974 2.856c-.783.57-1.838-.197-1.538-1.11l1.519-4.674a1 1 0 00-.342-1.11L3.44 11.08c-.774-.56-.375-1.813.586-1.813h4.906a1 1 0 00.95-.69l1.518-4.674z" />
        </svg>
      ),
      caption: "400 XP to next level",
      captionLinkText: "Level 12",
    },
  ];

  const questionsList: QuestionData[] = [
    {
      id: "Q1",
      topic: "SET THEORY",
      questionText: "Which of the following operations is distributive over intersection?",
      yourAnswer: "Union",
      isCorrect: true,
      points: 100,
      timeSpent: "12s",
      avgTime: "18s",
      difficulty: "Medium",
      explanation: "Union is distributive over intersection. Formally: A ∪ (B ∩ C) = (A ∪ B) ∩ (A ∪ C). Intersection is also distributive over union.",
    },
    {
      id: "Q2",
      topic: "PROOF TECHNIQUES",
      questionText: "In a proof by contrapositive for the statement P → Q, what do you assume?",
      yourAnswer: "Assume P is false",
      correctAnswer: "Assume ~Q",
      isCorrect: false,
      points: 0,
      timeSpent: "45s",
      avgTime: "30s",
      difficulty: "Hard",
      explanation: "In a proof by contrapositive, you establish the equivalence (P → Q) ≡ (~Q → ~P). Therefore, you must assume the negation of the conclusion (~Q) and attempt to prove the negation of the hypothesis (~P).",
    },
    {
      id: "Q3",
      topic: "RELATIONS",
      questionText: "Which relation property means if aRb and bRa then a=b?",
      yourAnswer: "Antisymmetric",
      isCorrect: true,
      points: 120,
      timeSpent: "8s",
      avgTime: "15s",
      difficulty: "Easy",
      explanation: "A relation R on a set A is antisymmetric if for all a, b ∈ A, if aRb and bRa, then a = b.",
    },
  ];

  const topicsList = [
    { name: "Set Theory", percentage: 100, barColor: "bg-emerald-500" },
    { name: "Relations", percentage: 80, barColor: "bg-[#483CD8]" },
    { name: "Functions", percentage: 100, barColor: "bg-emerald-500" },
    { name: "Proof Techniques", percentage: 60, barColor: "bg-red-500" },
  ];

  const filteredQuestions = activeQuestionTab === "all"
    ? questionsList
    : questionsList.filter((q) => !q.isCorrect);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8 space-y-8">
        
        {/* HERO COMPLETION BANNER */}
        <div className="relative w-full rounded-3xl bg-[#3B30D1] text-white p-6 sm:p-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6 overflow-hidden shadow-xl shadow-indigo-150/10">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none">
            <svg viewBox="0 0 300 300" className="w-full h-full object-cover">
              <circle cx="200" cy="100" r="100" fill="white" />
              <circle cx="240" cy="180" r="120" fill="white" />
            </svg>
          </div>

          <div className="relative z-10 space-y-3">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-black tracking-wider bg-emerald-500 text-white uppercase">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              QUIZ COMPLETE
            </span>
            <h1 className="text-2xl sm:text-3.5xl font-black tracking-tight">
              Discrete Mathematics – Quiz 3
            </h1>
            <p className="text-xs sm:text-sm text-indigo-200 font-bold">
              Completed on October 24, 2024 • 45 mins
            </p>
          </div>

          <div className="relative z-10 flex-shrink-0 flex items-center sm:items-end flex-row sm:flex-col justify-between sm:justify-center gap-2 border-t sm:border-t-0 border-white/10 pt-4 sm:pt-0">
            <div className="text-left sm:text-right">
              <div className="text-3xl sm:text-4.5xl font-black tracking-tight flex items-baseline gap-1.5 justify-end">
                2,450 <span className="text-xs sm:text-sm font-bold text-indigo-200">pts</span>
              </div>
              <div className="flex items-center sm:justify-end gap-1.5 text-xs text-indigo-100 font-bold mt-1">
                <svg className="w-4 h-4 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z" />
                </svg>
                3rd Place out of 48
              </div>
            </div>
          </div>
        </div>

        {/* METRICS SECTION */}
        <div className="space-y-4">
          <h2 className="text-sm font-black text-slate-500 uppercase tracking-wider">
            Performance Summary
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {metricsData.map((stat, i) => (
              <MetricCard key={i} {...stat} />
            ))}
          </div>
        </div>

        {/* WORKSPACE COLUMN SPLIT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* QUESTIONS LIST */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <h2 className="text-sm font-black text-slate-500 uppercase tracking-wider">
                Question Analysis
              </h2>

              <div className="flex gap-2 bg-slate-200/60 p-1 rounded-xl w-fit self-start">
                <button
                  onClick={() => setActiveQuestionTab("all")}
                  className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                    activeQuestionTab === "all"
                      ? "bg-white text-slate-800 shadow-sm"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  All (20)
                </button>
                <button
                  onClick={() => setActiveQuestionTab("incorrect")}
                  className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                    activeQuestionTab === "incorrect"
                      ? "bg-white text-slate-800 shadow-sm"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  Incorrect (3)
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {filteredQuestions.map((q) => (
                <QuestionCard key={q.id} question={q} />
              ))}
            </div>

            <button className="w-full py-4 text-center bg-white border border-slate-150 rounded-2xl text-xs font-black text-slate-500 hover:bg-slate-50 transition-colors">
              Load More Questions
            </button>
          </div>

          {/* SIDEBAR */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-black text-slate-800 pb-1.5 border-b border-slate-50">
                Topic Mastery
              </h3>
              <div className="space-y-4">
                {topicsList.map((topic, i) => (
                  <TopicMasteryBar key={i} {...topic} />
                ))}
              </div>
            </div>

            {/* AI Coach Card */}
            <div className="bg-[#1D10C5] text-white rounded-3xl p-6 shadow-xl shadow-indigo-150/30 relative overflow-hidden flex flex-col justify-between h-[360px]">
              <div className="space-y-4 z-10 relative">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-lg bg-white/10 flex items-center justify-center">
                    <svg className="h-4.5 w-4.5 text-indigo-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div>
                  <h3 className="text-xs font-black tracking-wide uppercase">
                    AI Coach Insights
                  </h3>
                </div>

                <p className="text-xs font-semibold leading-relaxed text-slate-105">
                  Great job overall! However, you struggled with <strong className="text-[#63F6B5]">Proof Techniques</strong>, specifically indirect proofs.
                </p>

                <div className="bg-[#120593]/50 border border-white/10 p-4 rounded-2xl space-y-2">
                  <span className="text-[9px] font-black text-indigo-300 tracking-wider block uppercase">
                    RECOMMENDATION
                  </span>
                  <p className="text-[11px] font-bold leading-relaxed text-slate-100">
                    Focus on mastering contrapositive and contradiction proofs before the next battle. Review Chapter 5.
                  </p>
                </div>
              </div>

              <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-y-6 translate-x-4">
                <svg width="180" height="180" viewBox="0 0 100 100" fill="currentColor">
                  <rect x="10" y="10" width="80" height="80" rx="15" />
                </svg>
              </div>

              <button className="w-full py-3 px-4 bg-white hover:bg-slate-50 text-[#1D10C5] font-black text-xs rounded-xl transition-all shadow-sm active:scale-98 relative z-10">
                Start Practice Session
              </button>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}