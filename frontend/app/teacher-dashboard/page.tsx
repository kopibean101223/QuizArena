"use client";
import React from 'react';
import { 
  Plus, 
  Sparkles, 
  ArrowRight, 
  Sigma, 
  Network, 
  TrendingUp,
  Crosshair,
  TreePine
} from 'lucide-react';

export default function TeacherDashboard() {
  
  const handleCreateSection = () => console.log("Create New Section clicked");
  const handleViewInsights = () => console.log("View Insights clicked");
  const handleGenerateQuiz = () => console.log("Generate Quiz clicked");
  const handleViewAllCourses = () => console.log("View All Courses clicked");
  const handleManageBattles = () => console.log("Manage Battles clicked");
  
  const handleViewAnalytics = (battleId: string | number) => {
    console.log(`View Analytics clicked for battle ID: ${battleId}`);
  };

  const coursesData = [
    {
      id: "course_1",
      title: "Discrete Mathematics",
      section: "Section 01",
      schedule: "Mon/Wed 10:00 AM",
      enrolled: 142,
      avgScore: 84,
      syllabusCompletion: 45,
      Icon: Sigma,
      iconTheme: "bg-indigo-50 text-indigo-600",
      scoreTheme: "text-emerald-600"
    },
    {
      id: "course_2",
      title: "Data Structures 101",
      section: "Section 03",
      schedule: "Tue/Thu 1:00 PM",
      enrolled: 215,
      avgScore: 72,
      syllabusCompletion: 60,
      Icon: Network,
      iconTheme: "bg-indigo-50 text-indigo-600",
      scoreTheme: "text-rose-600"
    },
    {
      id: "course_3",
      title: "Advanced Calculus",
      section: "Section 02",
      schedule: "Fri 9:00 AM",
      enrolled: 85,
      avgScore: 91,
      syllabusCompletion: 30,
      Icon: TrendingUp,
      iconTheme: "bg-indigo-50 text-indigo-600",
      scoreTheme: "text-emerald-600"
    }
  ];

  const battlesData = [
    {
      id: "battle_1",
      title: "Logic Gate Blitz",
      courseName: "Discrete Mathematics",
      participants: 42,
      progress: { current: 12, total: 20 },
      timeRemaining: "08:45",
      Icon: Crosshair,
      iconTheme: "bg-rose-50 text-rose-600",
      progressPercent: 60
    },
    {
      id: "battle_2",
      title: "Binary Search Tree Tournament",
      courseName: "Data Structures 101",
      participants: 120,
      progress: { current: 3, total: 10 },
      timeRemaining: "12:30",
      Icon: TreePine,
      iconTheme: "bg-indigo-50 text-indigo-600",
      progressPercent: 30
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-8 py-8 space-y-10">
      
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl fw-bold text-gray-900">Academic Overview</h1>
          <p className="text-gray-500 fs-sm mt-1">Manage your active sections and monitor student battle performance.</p>
        </div>
        <button 
          onClick={handleCreateSection}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg fs-sm fw-semibold transition-colors"
        >
          <Plus size={16} />
          Create New Section
        </button>
      </section>

      <section className="bg-white border border-gray-100 shadow-sm rounded-2xl p-5 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="bg-indigo-50 text-indigo-600 p-2.5 rounded-full mt-1">
            <Sparkles size={20} />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h2 className="fw-semibold text-gray-900">AI Performance Insight</h2>
              <span className="bg-emerald-100 text-emerald-700 fs-xs fw-bold px-2 py-0.5 rounded-full tracking-wide">
                NEW
              </span>
            </div>
            <p className="text-gray-600 fs-sm mt-1 leading-relaxed">
              Students in <span className="fw-semibold text-gray-800">Data Structures 101</span> are struggling with Red-Black Trees. We recommend generating a targeted review battle.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button 
            onClick={handleViewInsights}
            className="px-4 py-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg fs-sm fw-semibold transition-colors w-full md:w-auto"
          >
            View Insights
          </button>
          <button 
            onClick={handleGenerateQuiz}
            className="px-4 py-2 bg-indigo-800 hover:bg-indigo-900 text-white rounded-lg fs-sm fw-semibold transition-colors w-full md:w-auto whitespace-nowrap"
          >
            Generate Quiz
          </button>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="fw-semibold text-gray-900">Your Courses</h2>
          <button 
            onClick={handleViewAllCourses}
            className="text-indigo-600 hover:text-indigo-800 fs-sm fw-semibold flex items-center gap-1 transition-colors"
          >
            View All <ArrowRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {coursesData.map((course) => (
            <div key={course.id} className="bg-white border border-gray-200 shadow-sm rounded-2xl p-6">
              <div className={`${course.iconTheme} w-10 h-10 rounded-lg flex items-center justify-center mb-4`}>
                <course.Icon size={20} />
              </div>
              <h3 className="fw-semibold text-gray-900">{course.title}</h3>
              <p className="text-gray-500 fs-xs mt-1">{course.section} • {course.schedule}</p>
              
              <div className="flex justify-between items-end mt-6 mb-4">
                <div>
                  <p className="fs-xs fw-bold text-gray-400 uppercase tracking-wider">Enrolled</p>
                  <p className="fw-semibold text-gray-900 mt-0.5">
                    <span className="text-lg">{course.enrolled}</span> <span className="fs-sm fw-regular text-gray-500">Students</span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="fs-xs fw-bold text-gray-400 uppercase tracking-wider">Avg Score</p>
                  <p className={`fw-semibold text-lg mt-0.5 ${course.scoreTheme}`}>{course.avgScore}%</p>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <div className="flex justify-between fs-xs text-gray-500 mb-2">
                  <span>Syllabus Completion</span>
                  <span>{course.syllabusCompletion}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5">
                  <div className="bg-indigo-700 h-1.5 rounded-full" style={{ width: `${course.syllabusCompletion}%` }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h2 className="fw-semibold text-gray-900">Active Quiz Battles</h2>
            <span className="w-2 h-2 rounded-full bg-rose-600"></span>
          </div>
          <button 
            onClick={handleManageBattles}
            className="text-indigo-600 hover:text-indigo-800 fs-sm fw-semibold flex items-center gap-1 transition-colors"
          >
            Manage Battles <ArrowRight size={16} />
          </button>
        </div>

        <div className="bg-white border border-gray-200 shadow-sm rounded-2xl flex flex-col">
          {battlesData.map((battle, index) => (
            <div 
              key={battle.id} 
              className={`flex flex-col md:flex-row md:items-center justify-between p-6 gap-4 ${
                index !== battlesData.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              <div className="flex items-center gap-4 w-full md:w-1/3">
                <div className={`${battle.iconTheme} w-10 h-10 rounded-full flex items-center justify-center shrink-0`}>
                  <battle.Icon size={20} />
                </div>
                <div>
                  <h3 className="fw-semibold text-gray-900">{battle.title}</h3>
                  <p className="text-gray-500 fs-sm mt-0.5">{battle.courseName} • {battle.participants} Participants</p>
                </div>
              </div>
              
              <div className="w-full md:w-1/4">
                <div className="flex justify-between fs-xs text-gray-500 mb-1.5">
                  <span>Progress</span>
                  <span className="fw-semibold text-gray-700">{battle.progress.current}/{battle.progress.total}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5">
                  <div className="bg-indigo-700 h-1.5 rounded-full" style={{ width: `${battle.progressPercent}%` }}></div>
                </div>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-8 w-full md:w-1/3">
                <div className="text-center md:text-left">
                  <p className="fs-xs fw-bold text-gray-400 uppercase tracking-wider mb-0.5">Time Remaining</p>
                  <p className="fw-bold text-gray-900 text-lg">{battle.timeRemaining}</p>
                </div>
                <button 
                  onClick={() => handleViewAnalytics(battle.id)}
                  className="px-4 py-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg fs-sm fw-semibold transition-colors"
                >
                  View Analytics
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}54