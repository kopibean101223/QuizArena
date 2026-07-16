"use client";

import React from "react";

export interface Player {
  name: string;
  avatar: string;
  status: "OK" | "IDLE";
  isLeader?: boolean;
}

interface PlayerCardProps {
  player: Player;
}

export default function PlayerCard({ player }: PlayerCardProps) {
  return (
    <div
      className={`relative bg-white rounded-2xl p-3.5 border flex items-center gap-3 transition-all ${
        player.isLeader
          ? "border-[#483CD8] bg-indigo-50/20 ring-2 ring-[#483CD8]/15"
          : "border-slate-100 hover:border-slate-200 shadow-sm"
      }`}
    >
      {/* Leader Badge */}
      {player.isLeader && (
        <span className="absolute top-2.5 right-3 px-2 py-0.5 rounded text-[8px] font-black tracking-widest bg-[#1D10C5] text-white uppercase">
          Leader
        </span>
      )}

      {/* Avatar */}
      <div className="relative h-10 w-10 rounded-full overflow-hidden border border-slate-100">
        <img
          src={player.avatar}
          alt={player.name}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Info */}
      <div>
        <h4 className="text-xs font-extrabold text-slate-800">{player.name}</h4>
        <div className="flex items-center gap-1 mt-1">
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              player.status === "OK" ? "bg-emerald-500" : "bg-amber-400"
            }`}
          />
          <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
            {player.status}
          </span>
        </div>
      </div>
    </div>
  );
}