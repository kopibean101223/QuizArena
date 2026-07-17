"use client";

import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Plus, 
  Folder, 
  Sparkles, 
  FileUp, 
  Circle, 
  CheckCircle,
  ArrowRight,
  Settings,
  Users
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CreateQuizPage() {
  const [selectedSection, setSelectedSection] = useState<string>("section_1");
  const [selectedSource, setSelectedSource] = useState<string>("rag");
  const [selectedMode, setSelectedMode] = useState<string>("mode_1");
  const [teamSize, setTeamSize] = useState<string>("3vs3");

  const handleNewSection = () => console.log("Create New Section clicked");
  const handleBrowseBank = () => router.push('/teacher-dashboard/question-bank');
  const handleUploadSyllabus = () => console.log("Upload Syllabus clicked");
  const handleCancel = () => console.log("Cancel clicked - navigate back");
  const router = useRouter();
  const handleReviewQuestions = () => {
router.push('/teacher-dashboard/review-question')
  };

  const sectionsData = [
    {
      id: "section_1",
      title: "Discrete Mathematics",
      details: "Section A • 45 Students"
    },
    {
      id: "section_2",
      title: "Data Structures II",
      details: "Section B • 38 Students"
    }
  ];

  const modesData = [
    {
      id: "mode_1",
      title: "Speed Mode (Individual)",
      description: "Fast-paced competitive environment testing individual factual recall."
    },
    {
      id: "mode_2",
      title: "Team Mode (Discussion)",
      description: "Collaborative reasoning for complex algorithmic logic with adaptive team balancing."
    },
    {
      id: "mode_3",
      title: "Last Scholar Standing (Battle Royale)",
      description: "A high-stakes elimination mode where the last surviving student or team wins."
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-8 py-10 space-y-8">

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl fw-bold text-gray-900">Create New Quiz Battle</h1>
          <p className="text-gray-500 fs-sm mt-1">Configure settings for your next assessment session.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-2 rounded-full bg-indigo-600"></div>
          <div className="w-8 h-2 rounded-full bg-gray-200"></div>
          <div className="w-8 h-2 rounded-full bg-gray-200"></div>
          <div className="w-8 h-2 rounded-full bg-gray-200"></div>
        </div>
      </div>

      <section className="bg-white border border-gray-200 shadow-sm rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center fs-xs fw-bold">1</div>
          <h2 className="fw-semibold text-gray-900 fs-2xl">Select Section</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {sectionsData.map((section) => (
            <button
              key={section.id}
              onClick={() => setSelectedSection(section.id)}
              className={`relative text-left p-4 rounded-xl border-2 transition-all ${
                selectedSection === section.id 
                  ? 'border-indigo-600 bg-indigo-50' 
                  : 'border-gray-100 hover:border-gray-200 bg-white'
              }`}
            >
              <h3 className={`fw-semibold ${selectedSection === section.id ? 'text-indigo-900' : 'text-gray-900'}`}>
                {section.title}
              </h3>
              <p className={`fs-xs mt-1 ${selectedSection === section.id ? 'text-indigo-700' : 'text-gray-500'}`}>
                {section.details}
              </p>
              {selectedSection === section.id && (
                <CheckCircle2 className="absolute top-4 right-4 text-indigo-600" size={20} />
              )}
            </button>
          ))}
          
          <button 
            onClick={handleNewSection}
            className="flex items-center justify-center gap-2 p-4 rounded-xl border-2 border-dashed border-indigo-200 text-indigo-600 hover:bg-indigo-50 transition-colors fw-semibold fs-sm"
          >
            <Plus size={18} />
            New Section
          </button>
        </div>
      </section>

      <section className="bg-white border border-gray-200 shadow-sm rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-6 h-6 rounded-full bg-gray-100 text-gray-700 flex items-center justify-center fs-xs fw-bold">2</div>
          <h2 className="fw-semibold text-gray-900 fs-2xl">Content Source</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div 
            onClick={() => setSelectedSource("bank")}
            className={`p-6 rounded-xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
              selectedSource === "bank" ? 'border-indigo-600 bg-indigo-50/50' : 'border-gray-100 hover:border-gray-200'
            }`}
          >
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-indigo-100 text-indigo-600 w-10 h-10 rounded-lg flex items-center justify-center">
                  <Folder size={20} />
                </div>
                <h3 className="fw-semibold text-gray-900">Build Custom Questions</h3>
              </div>
              <p className="text-gray-500 fs-sm">Choose from previously validated algorithmic logic and math questions.</p>
            </div>
            <button 
              onClick={(e) => { e.stopPropagation(); handleBrowseBank(); }}
              className="mt-6 w-full py-2.5 px-4 rounded-lg border border-gray-200 text-gray-700 fw-semibold fs-sm hover:bg-gray-50 transition-colors"
            >
              Browse Bank
            </button>
          </div>

          <div 
            onClick={() => setSelectedSource("rag")}
            className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
              selectedSource === "rag" ? 'border-indigo-600 bg-indigo-50/20' : 'border-gray-100 hover:border-gray-200'
            }`}
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                <div className="bg-indigo-600 text-white w-10 h-10 rounded-lg flex items-center justify-center">
                  <Sparkles size={20} />
                </div>
                <h3 className={`fw-semibold ${selectedSource === "rag" ? 'text-indigo-700' : 'text-gray-900'}`}>Generate via RAG</h3>
              </div>
              <span className="bg-indigo-600 text-white fs-xs fw-bold px-2 py-1 rounded-full uppercase tracking-wider">Recommended</span>
            </div>
            <p className="text-gray-500 fs-sm mb-6">Upload syllabus or instructional text. AI will generate context-specific questions.</p>
            
            <button 
              onClick={(e) => { e.stopPropagation(); handleUploadSyllabus(); }}
              className={`w-full py-6 rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-2 transition-colors ${
                selectedSource === "rag" ? 'border-indigo-300 bg-indigo-50/50 hover:bg-indigo-100/50' : 'border-gray-200 bg-gray-50'
              }`}
            >
              <FileUp size={24} className={selectedSource === "rag" ? "text-indigo-600" : "text-gray-400"} />
              <span className={`fs-sm fw-semibold ${selectedSource === "rag" ? "text-indigo-700" : "text-gray-600"}`}>
                Upload Syllabus <span className="fw-regular fs-xs text-gray-400">(PDF/DOCX)</span>
              </span>
            </button>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section className="bg-white border border-gray-200 shadow-sm rounded-2xl p-6 flex flex-col gap-8">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-6 h-6 rounded-full bg-gray-100 text-gray-700 flex items-center justify-center fs-xs fw-bold">3</div>
              <h2 className="fw-semibold text-gray-900 fs-2xl">Mode Selection</h2>
            </div>
            <div className="space-y-3">
              {modesData.map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setSelectedMode(mode.id)}
                  className={`w-full flex items-start gap-4 p-4 rounded-xl border-2 text-left transition-all ${
                    selectedMode === mode.id ? 'border-indigo-600 bg-indigo-50/30' : 'border-gray-100 hover:border-gray-200'
                  }`}
                >
                  <div className="mt-0.5">
                    {selectedMode === mode.id ? (
                      <CheckCircle className="text-indigo-600" size={20} />
                    ) : (
                      <Circle className="text-gray-300" size={20} />
                    )}
                  </div>
                  <div>
                    <h3 className={`fw-semibold fs-sm ${selectedMode === mode.id ? 'text-indigo-900' : 'text-gray-900'}`}>
                      {mode.title}
                    </h3>
                    <p className="text-gray-500 fs-xs mt-1 leading-relaxed">
                      {mode.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        <div className="space-y-8 flex flex-col justify-between">
          <section className="bg-white border border-gray-200 shadow-sm rounded-2xl p-6">
             <div className="space-y-6">
              <div>
                <label className="block fs-sm fw-semibold text-gray-900 mb-2">Number of Questions</label>
                <input 
                  type="number" 
                  defaultValue={10}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 fs-sm"
                />
              </div>
              <div>
                <label className="block fs-sm fw-semibold text-gray-900 mb-2">Time Limit per Question</label>
                <select className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 appearance-none fs-sm">
                  <option>100 Seconds</option>
                  <option>60 Seconds</option>
                  <option>30 Seconds</option>
                </select>
              </div>
            </div>
          </section>

          <section className="bg-white border border-gray-200 shadow-sm rounded-2xl p-6 h-full">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-6 h-6 rounded-full bg-gray-100 text-gray-700 flex items-center justify-center fs-xs fw-bold">4</div>
              <h2 className="fw-semibold text-gray-900 fs-2xl">Schedule Battle</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block fs-xs fw-semibold text-gray-900 mb-2">Battle Date</label>
                <input 
                  type="date" 
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 fs-xs focus:outline-none focus:border-indigo-500 text-gray-600"
                />
              </div>
              <div>
                <label className="block fs-xs fw-semibold text-gray-900 mb-2">Start Time</label>
                <input 
                  type="time" 
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 fs-xs focus:outline-none focus:border-indigo-500 text-gray-600"
                />
              </div>
              <div>
                <label className="block fs-xs fw-semibold text-gray-900 mb-2">End Time</label>
                <input 
                  type="time" 
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 fs-xs focus:outline-none focus:border-indigo-500 text-gray-600"
                />
              </div>
            </div>
          </section>
        </div>
      </div>

      {selectedMode === "mode_2" && (
        <section className="bg-white border border-gray-200 shadow-sm rounded-2xl p-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <Users className="text-indigo-600" size={24} />
              <h2 className="fw-semibold text-gray-900 fs-2xl">Team Settings</h2>
            </div>
            <span className="bg-gray-100 text-gray-700 fs-xs fw-semibold px-3 py-1.5 rounded-full">
              Adaptive Randomization Active
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block fs-sm fw-semibold text-gray-900 mb-3">Desired Team Size</label>
              <div className="flex items-center bg-gray-100 p-1 rounded-lg w-fit mb-2">
                <button
                  onClick={() => setTeamSize("3vs3")}
                  className={`px-5 py-1.5 rounded-md fs-sm fw-semibold transition-colors ${
                    teamSize === "3vs3" ? "bg-indigo-600 text-white shadow" : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  3 vs 3
                </button>
                <button
                  onClick={() => setTeamSize("5vs5")}
                  className={`px-5 py-1.5 rounded-md fs-sm fw-semibold transition-colors ${
                    teamSize === "5vs5" ? "bg-indigo-600 text-white shadow" : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  5 vs 5
                </button>
              </div>
              <p className="text-gray-500 fs-xs mt-2">Algorithm will optimize for demographic parity.</p>
            </div>

            <div>
              <label className="block fs-sm fw-semibold text-gray-900 mb-3">Leader Assignment Logic</label>
              <select className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 appearance-none fs-sm text-gray-700">
                <option>Highest Historical Accuracy</option>
                <option>Random Assignment</option>
                <option>Lowest Historical Accuracy</option>
              </select>
              <p className="text-gray-500 fs-xs mt-2">Determines the designated tie-breaker for team disputes.</p>
            </div>
          </div>
        </section>
      )}

      <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-100">
        <button 
          onClick={handleCancel}
          className="px-6 py-2.5 rounded-lg border border-gray-200 text-gray-700 fw-semibold fs-sm hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button 
          onClick={handleReviewQuestions}
          className="px-6 py-2.5 rounded-lg bg-[#10b981] hover:bg-[#059669] text-white fw-semibold fs-sm flex items-center gap-2 transition-colors"
        >
          Review Questions
          <ArrowRight size={18} />
        </button>
      </div>

    </div>
  );
}