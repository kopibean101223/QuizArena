"use client";

import React from "react";

export interface ParticipantProps {
  type: "self" | "image" | "initials" | "empty";
  name?: string;
  avatarUrl?: string;
}

export default function LobbyParticipant({ type, name, avatarUrl }: ParticipantProps) {
  if (type === "self") {
    return (
      <div className="flex flex-col items-center">
        <div className="relative w-12 h-12 rounded-full border-2 border-indigo-600 p-0.5">
          <div className="w-full h-full bg-indigo-600 text-white font-bold text-xs rounded-full flex items-center justify-center">
            You
          </div>
          <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full" />
        </div>
      </div>
    );
  }

  if (type === "image" && avatarUrl) {
    return (
      <div className="flex flex-col items-center">
        <img
          src={avatarUrl}
          alt={name || "avatar"}
          className="w-12 h-12 rounded-full object-cover border border-slate-200"
        />
      </div>
    );
  }

  if (type === "initials" && name) {
    return (
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-500 font-bold text-xs flex items-center justify-center border border-slate-200">
          {name}
        </div>
      </div>
    );
  }

  // Fallback / Empty variant
  return (
    <div className="flex flex-col items-center">
      <div className="w-12 h-12 rounded-full bg-slate-100/50 border border-dashed border-slate-200" />
    </div>
  );
}