"use client";

import React from "react";

export interface MetricDetail {
  label: string;
  value: string;
  valueColor?: string;
}

interface MetricCardProps {
  title: string;
  value: string;
  badge?: string | null;
  badgeColor?: string;
  icon: React.ReactNode;
  iconBgClassName?: string;
  details?: MetricDetail[];
  progressBarValue?: number; // percentage (0-100)
  caption?: string;
  captionLinkText?: string;
}

export default function MetricCard({
  title,
  value,
  badge,
  badgeColor = "text-slate-500 bg-slate-100",
  icon,
  iconBgClassName = "bg-indigo-50",
  details,
  progressBarValue,
  caption,
  captionLinkText,
}: MetricCardProps) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex flex-col justify-between min-h-36 relative overflow-hidden group hover:shadow-md transition-shadow">
      {/* Top Row */}
      <div className="flex items-start justify-between">
        <div className={`${iconBgClassName} p-2 rounded-xl flex items-center justify-center`}>
          {icon}
        </div>
        {badge && (
          <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${badgeColor}`}>
            {badge}
          </span>
        )}
      </div>

      {/* Info Content */}
      <div className="mt-4 flex-1 flex flex-col justify-end">
        <span className="text-[10px] font-bold text-slate-400 block tracking-wide uppercase">
          {title}
        </span>
        <span className="text-xl font-black text-slate-800 mt-1 block leading-none">
          {value}
        </span>

        {/* Dynamic score breakdowns */}
        {details && details.length > 0 && (
          <div className="mt-3.5 space-y-1 border-t border-dashed border-slate-100 pt-2.5">
            {details.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-[10px] font-bold text-slate-400">
                <span>{item.label}</span>
                <span className={item.valueColor || "text-slate-600"}>{item.value}</span>
              </div>
            ))}
          </div>
        )}

        {/* Dynamic Progress Bar */}
        {progressBarValue !== undefined && (
          <div className="w-full h-1.5 bg-slate-100 rounded-full mt-5 overflow-hidden">
            <div 
              className="h-full bg-emerald-500 rounded-full transition-all duration-500" 
              style={{ width: `${progressBarValue}%` }} 
            />
          </div>
        )}

        {/* Dynamic Caption / Level info */}
        {caption && (
          <p className="text-[10px] font-bold text-slate-400 mt-3.5">
            {captionLinkText ? (
              <span className="underline text-indigo-600 cursor-pointer hover:text-indigo-800">
                {captionLinkText}
              </span>
            ) : null}
            {captionLinkText ? ` - ${caption}` : caption}
          </p>
        )}
      </div>
    </div>
  );
}