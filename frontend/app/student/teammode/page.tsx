"use client";

import React, { useState, FormEvent, ChangeEvent } from "react";
import Navbar from "@/components/student/navbar";
import Footer from "@/components/student/footer";
import PlayerCard, { Player } from "@/components/student/teammode/playercard";
import QuizVoteOptions, { VoteOptionItem } from "@/components/student/teammode/quizoptions";

interface Message {
  id: string;
  sender: string;
  time: string;
  text: string;
  isSelf?: boolean;
}

export default function TeamBattlePage() {
  // State for interactive option voting
  const [selectedOption, setSelectedOption] = useState<string>("B");
  const [votesCount, setVotesCount] = useState<number>(2);

  // Chat State
  const [chatMessages, setChatMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "ALEX_DEV",
      time: "12:30 PM",
      text: "I think it's the successor. It minimizes rotations in the right subtree.",
      isSelf: true,
    },
    {
      id: "2",
      sender: "M_CHEN",
      time: "12:31 PM",
      text: "Agreed. B seems like the most efficient choice here.",
      isSelf: false,
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const alphaPlayers: Player[] = [
    { name: "Alex_Dev", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150", status: "OK", isLeader: true },
    { name: "Jordan_S", avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150", status: "IDLE" },
    { name: "M_Chen", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150", status: "OK" },
    { name: "M_Chen", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150", status: "OK" },
    { name: "M_Chen", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150", status: "OK" },
  ];

  const options: VoteOptionItem[] = [
    { id: "A", text: "The immediate inorder predecessor" },
    { id: "B", text: "The immediate inorder successor" },
    { id: "C", text: "The root of the right subtree" },
    { id: "D", text: "The deepest leaf node" },
  ];

  const handleVote = (id: string) => {
    setSelectedOption(id);
    if (id === "B") {
      setVotesCount(2);
    } else {
      setVotesCount(1);
    }
  };

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMsg: Message = {
      id: Date.now().toString(),
      sender: "ALEX_DEV",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      text: inputMessage,
      isSelf: true,
    };

    setChatMessages((prev) => [...prev, newMsg]);
    setInputMessage("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8 grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        
        {/* ================= LEFT COLUMN: TEAM ALPHA ROSTER ================= */}
        <div className="xl:col-span-3 space-y-4">
          <div className="bg-[#1D10C5] text-white p-4 rounded-2xl shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black tracking-widest uppercase text-indigo-200">Team Alpha</span>
              <span className="text-lg font-black">1,240</span>
            </div>
            <div className="w-full h-1.5 bg-[#120593] rounded-full mt-3 overflow-hidden">
              <div className="h-full bg-indigo-300 w-2/3 rounded-full" />
            </div>
          </div>

          {/* Extracted Player Roster Loop */}
          <div className="space-y-2.5">
            {alphaPlayers.map((player, idx) => (
              <PlayerCard key={idx} player={player} />
            ))}
          </div>
        </div>

        {/* ================= MIDDLE COLUMN: ACTIVE QUIZ WORKSPACE ================= */}
        <div className="xl:col-span-6 bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-8 flex flex-col justify-between min-h-[600px]">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="px-3.5 py-1.5 rounded-full text-xs font-black tracking-wide bg-indigo-50 text-[#483CD8]">
                  Question 4 / 10
                </span>
                <span className="text-xs font-bold text-slate-400">Algorithmic Logic</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-black text-red-500">
                <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                00:42
              </div>
            </div>

            <div className="space-y-3">
              <h1 className="text-base sm:text-lg font-black text-slate-800 leading-snug">
                Optimizing Balanced Binary Search Tree Deletion
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-semibold">
                Given a Red-Black Tree where a black node with two children is to be deleted. Which node should be chosen as the successor to maintain the red-black properties with the least number of re-balancing operations?
              </p>
            </div>

            {/* Extracted Choice Component */}
            <QuizVoteOptions
              options={options}
              selectedOption={selectedOption}
              votesCount={votesCount}
              onVote={handleVote}
            />
          </div>

          <div className="pt-6 border-t border-slate-100 space-y-4">
            <div className="flex items-center justify-between text-xs font-black text-slate-400 tracking-wider">
              <span>TEAM CONSENSUS</span>
              <div className="flex gap-1.5 items-center">
                <span className={`h-1.5 w-7 rounded-full transition-colors ${votesCount >= 2 ? 'bg-emerald-500' : 'bg-slate-200'}`} />
                <span className={`h-1.5 w-7 rounded-full transition-colors ${votesCount >= 2 ? 'bg-emerald-500' : 'bg-slate-200'}`} />
                <span className="h-1.5 w-7 rounded-full bg-slate-200" />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="flex-1 py-4 bg-[#046C4E] hover:bg-[#03553d] active:scale-98 text-white font-extrabold text-xs rounded-2xl flex items-center justify-center gap-2 transition-all shadow-md">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Confirm Team Choice
              </button>

              <div className="bg-slate-100 rounded-2xl px-4 py-3 text-center border border-slate-200/50 flex-shrink-0">
                <span className="text-[9px] font-black text-slate-400 tracking-wider block uppercase">Votes:</span>
                <span className="text-sm font-black text-indigo-950 mt-0.5 block">{votesCount}/3</span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= RIGHT COLUMN: BETA TEAM & CHAT ================= */}
        <div className="xl:col-span-3 space-y-4 h-full flex flex-col justify-between">
          <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black tracking-widest uppercase text-slate-400">Team Beta</span>
              <span className="text-sm font-black text-slate-700">1,080</span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-slate-400 w-1/2 rounded-full" />
            </div>
            <div className="flex items-center justify-between pt-1">
              <div className="flex -space-x-2">
                {['bg-red-200', 'bg-blue-200', 'bg-purple-200'].map((col, idx) => (
                  <div key={idx} className={`h-5 w-5 rounded-full ${col} border border-white`} />
                ))}
              </div>
              <span className="text-[9px] font-black text-slate-400 tracking-wider uppercase">3 Players Live</span>
            </div>
          </div>

          <div className="bg-white border border-slate-100 rounded-3xl shadow-sm flex flex-col overflow-hidden h-[415px]">
            <div className="p-4 border-b border-slate-50 flex items-center justify-between">
              <h3 className="text-xs font-extrabold text-[#483CD8] flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Team Discussion
              </h3>
              <span className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse" />
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/20">
              {chatMessages.map((msg) => (
                <div key={msg.id} className={`flex flex-col ${msg.isSelf ? 'items-end' : 'items-start'}`}>
                  <span className="text-[9px] font-black text-slate-400 tracking-wider mb-1 uppercase">
                    {msg.sender} <span className="font-medium text-slate-300 ml-1">{msg.time}</span>
                  </span>
                  <div className={`max-w-[90%] p-3 text-xs font-semibold leading-relaxed rounded-2xl ${
                    msg.isSelf 
                      ? 'bg-[#483CD8] text-white rounded-tr-none' 
                      : 'bg-white border border-slate-100 text-slate-600 rounded-tl-none shadow-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}

              {votesCount >= 2 && (
                <div className="flex justify-center py-2">
                  <span className="px-3 py-1 rounded-full text-[9px] font-black tracking-wide bg-emerald-100 text-emerald-800 uppercase">
                    2 people voted for B
                  </span>
                </div>
              )}
            </div>

            <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-slate-50 flex items-center gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setInputMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 bg-[#F3F4FE] rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-600 outline-none placeholder-slate-400"
              />
              <button 
                type="submit" 
                className="h-8 w-8 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-[#483CD8] flex items-center justify-center transition-colors"
              >
                <svg className="h-4 w-4 transform rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </form>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}