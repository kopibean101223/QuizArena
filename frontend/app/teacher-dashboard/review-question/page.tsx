"use client";

import React, { useState } from 'react';
import { 
  Filter, 
  RefreshCw, 
  BarChart2, 
  List, 
  AlignLeft, 
  Trash2, 
  MoreVertical, 
  Rocket
} from 'lucide-react';

export default function ReviewQuestionsPage() {
  const [pendingQuestions, setPendingQuestions] = useState([
    {
      id: "7741",
      topic: "Set Theory: Power Sets",
      difficulty: "Medium",
      type: "MCQ",
      questionText: 'Given a set S = {1, 2, 3}, which of the following is the correct representation of the power set P(S), and what is its cardinality?',
      options: [
        { label: "A", text: "P(S) = {{1}, {2}, {3}}, cardinality = 3", isCorrect: false },
        { label: "B", text: "P(S) = {ø, {1}, {2}, {3}, {1,2}, {1,3}, {2,3}, {1,2,3}}, cardinality = 8", isCorrect: true },
        { label: "C", text: "P(S) = {ø, {1}, {2}, {3}}, cardinality = 4", isCorrect: false },
        { label: "D", text: "P(S) = {{1,2}, {2,3}, {1,3}}, cardinality = 3", isCorrect: false }
      ]
    },
    {
      id: "7745",
      topic: "Identify: Picao's Gender",
      difficulty: "Hard",
      type: "Theory",
      questionText: "What is Macky Noble Picao's sex?",
      answerText: "Answer: Bading"
    }
  ]);

  const [approvedQuestions, setApprovedQuestions] = useState([
    {
      id: "#QA-1102",
      topic: "Boolean Algebra",
      subtopic: "Simplification Rules",
      type: "True/False",
      difficulty: "Easy",
      status: "Staged"
    },
    {
      id: "#QA-1098",
      topic: "Graph Theory",
      subtopic: "Eulerian Paths",
      type: "MCQ",
      difficulty: "Hard",
      status: "Staged"
    }
  ]);

  const handleFilter = () => {};
  const handleRegenerate = () => {};
  const handleDelete = (id: string) => {};
  const handleEdit = (id: string) => {};
  const handleApprove = (id: string) => {};
  const handleSaveDraft = () => {};
  const handleLaunchQuiz = () => {};

  return (
    <div className="max-w-5xl mx-auto px-8 py-10 space-y-8">
      
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h1 className="fw-bold text-gray-900 fs-base">Pending Questions</h1>
          <span className="bg-indigo-600 text-white fs-xs fw-semibold px-3 py-1 rounded-full">
            {pendingQuestions.length} New
          </span>
        </div>
        <div className="flex items-center gap-6 text-gray-500 fs-sm fw-semibold">
          <button onClick={handleFilter} className="flex items-center gap-2 hover:text-indigo-600 transition-colors">
            <Filter size={16} /> Filter
          </button>
          <button onClick={handleRegenerate} className="flex items-center gap-2 hover:text-indigo-600 transition-colors">
            <RefreshCw size={16} /> Regenerate
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {pendingQuestions.map((q) => (
          <div key={q.id} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            
            <div className="flex items-center gap-4 mb-4">
              <span className="text-indigo-700 fw-bold fs-sm">Q-ID: {q.id}</span>
              <span className="text-gray-900 fw-bold fs-sm">{q.topic}</span>
              <div className="flex items-center gap-4 text-gray-400 fs-xs ml-2">
                <span className="flex items-center gap-1">
                  <BarChart2 size={14} /> {q.difficulty}
                </span>
                <span className="flex items-center gap-1">
                  {q.type === 'MCQ' ? <List size={14} /> : <AlignLeft size={14} />} {q.type}
                </span>
              </div>
            </div>

            <div className="bg-[#FAF9FD] border border-[#EAE5F9] rounded-xl p-4 fs-sm text-gray-700 mb-4">
              {q.questionText}
            </div>

            {q.type === 'MCQ' && q.options && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {q.options.map((opt, idx) => (
                  <div 
                    key={idx} 
                    className={`border rounded-lg p-3 fs-sm flex items-start gap-3 ${
                      opt.isCorrect 
                        ? 'border-[#059669] bg-[#ECFDF5] text-[#065F46]' 
                        : 'border-gray-200 text-gray-600'
                    }`}
                  >
                    <span className="fw-bold">{opt.label}.</span>
                    <span>{opt.text}</span>
                  </div>
                ))}
              </div>
            )}

            {q.type === 'Theory' && q.answerText && (
              <div className="bg-[#F8F6FE] border border-dashed border-[#C8B8F9] rounded-xl p-4 fs-sm italic text-[#785CE6] mb-6">
                {q.answerText}
              </div>
            )}

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
              <button 
                onClick={() => handleDelete(q.id)}
                className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
              >
                <Trash2 size={18} />
              </button>
              <button 
                onClick={() => handleEdit(q.id)}
                className="px-5 py-2 rounded-lg border border-gray-200 text-gray-700 fw-semibold fs-sm hover:bg-gray-50 transition-colors"
              >
                Edit
              </button>
              <button 
                onClick={() => handleApprove(q.id)}
                className="px-5 py-2 rounded-lg bg-[#047857] hover:bg-[#065f46] text-white fw-semibold fs-sm transition-colors"
              >
                Approve
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#FCFBFF] border border-[#E8E2F7] rounded-2xl overflow-hidden shadow-sm mt-10">
        <div className="p-5 border-b border-[#E8E2F7] bg-[#FAF9FD]">
          <h2 className="fw-bold text-gray-900 fs-sm">Approved Questions (Ready for Deployment)</h2>
        </div>
        
        <div className="w-full">
          <div className="grid grid-cols-6 p-4 border-b border-[#EAE5F9] text-gray-500 fw-bold fs-xs uppercase tracking-wider">
            <div className="col-span-1">ID</div>
            <div className="col-span-2">TOPIC</div>
            <div className="col-span-1">TYPE</div>
            <div className="col-span-1">DIFFICULTY</div>
            <div className="col-span-1">STATUS</div>
          </div>

          {approvedQuestions.map((aq, index) => (
            <div key={aq.id} className={`grid grid-cols-6 p-4 items-center ${index !== approvedQuestions.length - 1 ? 'border-b border-[#EAE5F9]' : ''}`}>
              <div className="col-span-1 text-indigo-700 fw-bold fs-sm">{aq.id}</div>
              <div className="col-span-2 flex flex-col">
                <span className="text-gray-900 fw-bold fs-sm">{aq.topic}</span>
                <span className="text-gray-400 fs-xs">{aq.subtopic}</span>
              </div>
              <div className="col-span-1 text-gray-700 fs-sm">{aq.type}</div>
              <div className="col-span-1 fs-sm">
                <span className={aq.difficulty === 'Easy' ? 'text-[#059669]' : aq.difficulty === 'Hard' ? 'text-rose-500' : 'text-gray-700'}>
                  {aq.difficulty}
                </span>
              </div>
              <div className="col-span-1 flex items-center justify-between">
                <div className="flex items-center gap-2 fw-bold text-[#059669] fs-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#059669]"></div>
                  {aq.status}
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreVertical size={16} />
                </button>
              </div>
            </div>
          ))}

          <div className="p-4 border-t border-[#EAE5F9] text-center bg-[#FAF9FD]">
            <button className="text-indigo-700 fw-bold fs-sm hover:underline">
              View All 42 Approved Questions
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-4 pt-8 pb-4">
        <button 
          onClick={handleSaveDraft}
          className="px-6 py-2.5 rounded-lg border border-gray-200 text-gray-700 fw-semibold fs-sm hover:bg-gray-50 transition-colors"
        >
          Save as Draft
        </button>
        <button 
          onClick={handleLaunchQuiz}
          className="px-6 py-2.5 rounded-lg bg-[#10b981] hover:bg-[#059669] text-white fw-semibold fs-sm flex items-center gap-2 transition-colors"
        >
          Launch Quiz
          <Rocket size={18} />
        </button>
      </div>

    </div>
  );
}