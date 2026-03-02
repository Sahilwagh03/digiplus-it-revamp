"use client";

import React from "react";
import { motion } from "framer-motion";

const ChatMockUp: React.FC = () => {
  return (
    <motion.div
      className="product-panel__visual reveal-right"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.12),0_0_0_1px_rgba(0,0,0,0.05)] overflow-hidden bg-[#f0f2f7]">
        {/* Titlebar */}
        <motion.div
          className="bg-[#e8eaf0] px-4 py-2.5 flex items-center gap-2 border-b border-black/[0.06]"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28CA41]" />
          <div className="flex-1 bg-white rounded-md px-3 py-1 mx-3 text-[11px] font-mono text-gray-400">
            neo.digiplus.io/chat
          </div>
        </motion.div>

        <div className="p-1.5">
          <div className="bg-[#f8f9fe] rounded-xl overflow-hidden flex flex-col h-[310px]">
            {/* Chat Header */}
            <motion.div
              className="bg-white px-4 py-2.5 border-b border-gray-200 flex items-center gap-2"
              initial={{ opacity: 0, y: -15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#6C5CE7] to-[#E84393] flex items-center justify-center text-[11px] text-white font-bold">
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
            </motion.div>

            {/* Messages */}
            <div className="flex-1 px-3 py-3 overflow-auto flex flex-col gap-2">
              {/* Message 1 */}
              <motion.div
                className="self-end max-w-[85%] bg-gradient-to-br from-[#6C5CE7] to-[#E84393] text-white text-[10px] leading-relaxed px-3 py-2 rounded-xl rounded-br-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7, duration: 0.4 }}
              >
                Show me the top 5 sites with highest packet loss this week
              </motion.div>

              {/* Message 2 */}
              <motion.div
                className="self-start max-w-[85%] bg-white border border-gray-200 text-gray-700 text-[10px] leading-relaxed px-3 py-2 rounded-xl rounded-bl-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1.1, duration: 0.4 }}
              >
                Analysing live network inventory across 14,208 nodes…
                <br />
                <br />
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
              </motion.div>

              {/* Message 3 */}
              <motion.div
                className="self-end max-w-[85%] bg-linear-to-br from-[#6C5CE7] to-[#E84393] text-white text-[10px] leading-relaxed px-3 py-2 rounded-xl rounded-br-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1.6, duration: 0.4 }}
              >
                What's causing DXB-RING-07?
              </motion.div>

              {/* Message 4 */}
              <motion.div
                className="self-start max-w-[85%] bg-white border border-gray-200 text-gray-700 text-[10px] leading-relaxed px-3 py-2 rounded-xl rounded-bl-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1.6, duration: 0.4 }}
              >
                Root cause analysis for <strong>DXB-RING-07</strong>:
                <br />
                Congestion on BGP peer 192.168.14.1 since Tue 14:32 UTC. Vendor:
                Huawei. Correlated with 3 upstream incidents in AS65001.
              </motion.div>
            </div>

            {/* Action Chips */}
            <motion.div
              className="flex gap-1.5 px-3 py-2 flex-wrap"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1.6, duration: 0.4 }}
            >
              {[
                "Escalate to NOC",
                "View full report",
                "Compare with last month",
              ].map((chip, i) => (
                <button
                  key={i}
                  className="bg-white border border-gray-200 rounded-full px-2.5 py-1 text-[9px] font-semibold text-[#6C5CE7] hover:bg-[#f3f0ff] transition"
                >
                  {chip}
                </button>
              ))}
            </motion.div>

            {/* Input */}
            <motion.div
              className="flex items-center gap-2 px-3 py-2 bg-white border-t border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1.6, duration: 0.4 }}
            >
              <input
                type="text"
                placeholder="Ask anything about your network…"
                readOnly
                className="flex-1 px-2.5 py-1.5 rounded-lg border border-gray-200 text-[10px] bg-gray-50 text-gray-700 outline-none"
              />
              <button className="w-6 h-6 rounded-full bg-linear-to-br from-[#6C5CE7] to-[#E84393] flex items-center justify-center text-white text-xs">
                ↑
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatMockUp;
