'use client';

import React from 'react';

const ChatMockUp: React.FC = () => {
  return (
    <div className="product-panel__visual reveal-right">
      <div className="rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.12),0_0_0_1px_rgba(0,0,0,0.05)] overflow-hidden bg-[#f0f2f7]">

        {/* Titlebar */}
        <div className="bg-[#e8eaf0] px-4 py-2.5 flex items-center gap-2 border-b border-black/[0.06]">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28CA41]" />

          <div className="flex-1 bg-white rounded-md px-3 py-1 mx-3 text-[11px] font-mono text-gray-400">
            neo.digiplus.io/chat
          </div>
        </div>

        {/* Body */}
        <div className="p-1.5">
          <div className="bg-[#f8f9fe] rounded-xl overflow-hidden flex flex-col h-[310px]">

            {/* Chat Header */}
            <div className="bg-white px-4 py-2.5 border-b border-gray-200 flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#6C5CE7] to-[#E84393] flex items-center justify-center text-[11px] text-white font-bold flex-shrink-0">
                N
              </div>

              <div className="flex-1">
                <div className="text-[12px] font-bold text-gray-900">
                  Neo — Network Intelligence AI
                </div>
                <div className="text-[9px] text-emerald-500 font-medium">
                  ● Online · Telecom Domain Mode
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 px-3 py-3 overflow-auto flex flex-col gap-2">

              {/* User */}
              <div className="self-end max-w-[85%] bg-gradient-to-br from-[#6C5CE7] to-[#E84393] text-white text-[10px] leading-relaxed px-3 py-2 rounded-xl rounded-br-sm">
                Show me the top 5 sites with highest packet loss this week
              </div>

              {/* AI */}
              <div className="self-start max-w-[85%] bg-white border border-gray-200 text-gray-700 text-[10px] leading-relaxed px-3 py-2 rounded-xl rounded-bl-sm">
                Analysing live network inventory across 14,208 nodes…
                <br /><br />
                <strong>Top 5 by Packet Loss (7d avg):</strong>
                <br />
                1. DXB-RING-07 — 4.2% ⚠️
                <br />
                2. SIN-EDGE-03 — 3.8% ⚠️
                <br />
                3. MUM-CORE-11 — 2.9%
                <br />
                4. NYC-POP-02 — 2.4%
                <br />
                5. LDN-RING-05 — 1.7%
              </div>

              {/* User */}
              <div className="self-end max-w-[85%] bg-gradient-to-br from-[#6C5CE7] to-[#E84393] text-white text-[10px] leading-relaxed px-3 py-2 rounded-xl rounded-br-sm">
                What's causing DXB-RING-07?
              </div>

              {/* AI */}
              <div className="self-start max-w-[85%] bg-white border border-gray-200 text-gray-700 text-[10px] leading-relaxed px-3 py-2 rounded-xl rounded-bl-sm">
                Root cause analysis for <strong>DXB-RING-07</strong>:
                <br />
                Congestion on BGP peer 192.168.14.1 since Tue 14:32 UTC.
                Vendor: Huawei.
                Correlated with 3 upstream incidents in AS65001.
              </div>

            </div>

            {/* Action Chips */}
            <div className="flex gap-1.5 px-3 py-2 flex-wrap">
              {[
                'Escalate to NOC',
                'View full report',
                'Compare with last month',
              ].map((chip, i) => (
                <button
                  key={i}
                  type="button"
                  className="bg-white border border-gray-200 rounded-full px-2.5 py-1 text-[9px] font-semibold text-[#6C5CE7] hover:bg-[#f3f0ff] transition"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="flex items-center gap-2 px-3 py-2 bg-white border-t border-gray-200">
              <input
                type="text"
                placeholder="Ask anything about your network…"
                readOnly
                className="flex-1 px-2.5 py-1.5 rounded-lg border border-gray-200 text-[10px] bg-gray-50 text-gray-700 outline-none"
              />
              <button
                type="button"
                className="w-6 h-6 rounded-full bg-gradient-to-br from-[#6C5CE7] to-[#E84393] flex items-center justify-center text-white text-xs"
              >
                ↑
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMockUp;