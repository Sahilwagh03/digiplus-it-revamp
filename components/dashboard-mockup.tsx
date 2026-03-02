"use client";

import React, { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

// Counter hook (does not affect design)
const useCounter = (end: number, duration = 1.5) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / (duration * 60);

    const interval = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(interval);
      } else {
        setCount(start);
      }
    }, 1000 / 60);

    return () => clearInterval(interval);
  }, [end, duration]);

  return Math.floor(count);
};

const DashboardMockUp: React.FC = () => {
  const uptime = useCounter(9997);
  const activeNodes = useCounter(14208);
  const incidents = useCounter(3);
  const sla = useCounter(984);

  return (
    <motion.div
      className="product-panel__visual reveal-right w-full"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      <div className="rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.12),0_0_0_1px_rgba(0,0,0,0.05)] overflow-hidden bg-[#f0f2f7]">

        {/* Browser Header (unchanged) */}
        <div className="bg-[#e8eaf0] px-3 md:px-4 py-2 md:py-2.5 flex items-center gap-1.5 md:gap-2 border-b border-black/6">
          <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-[#FF5F57]" />
          <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-[#FFBD2E]" />
          <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-[#28CA41]" />
          <div className="flex-1 bg-white rounded-md px-2 md:px-3 py-0.5 md:py-1 mx-2 md:mx-3 text-[9px] md:text-[11px] font-mono text-gray-400 truncate">
            app.digiplus.io/dashboard
          </div>
        </div>

        <div className="p-1.5 md:p-2">
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-1.5 md:gap-2 p-2 md:p-3 bg-[#f8f9fe] rounded-xl"
          >

            {/* KPI Cards */}
            {[
              {
                title: "Network Uptime",
                value: `${(uptime / 100).toFixed(2)}%`,
                sub: "↑ 0.02% vs last week",
                color: "text-emerald-500",
              },
              {
                title: "Active Nodes",
                value: activeNodes.toLocaleString(),
                sub: "↑ 127 new today",
                color: "text-emerald-500",
              },
              {
                title: "Incidents Open",
                value: incidents,
                sub: "↓ 12 resolved",
                color: "text-amber-400",
              },
              {
                title: "SLA Compliance",
                value: `${(sla / 10).toFixed(1)}%`,
                sub: "↑ On target",
                color: "text-emerald-500",
              },
            ].map((card, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="bg-white rounded-xl p-2.5 md:p-3.5 border border-black/5"
              >
                <div className="text-[9px] md:text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-0.5 md:mb-1 leading-tight">
                  {card.title}
                </div>
                <div className="text-lg md:text-[22px] font-bold text-gray-900 leading-none mb-0.5">
                  {card.value}
                </div>
                <div className={`text-[9px] md:text-[10px] font-semibold ${card.color}`}>
                  {card.sub}
                </div>
              </motion.div>
            ))}

            {/* Traffic Chart */}
            <motion.div
              variants={itemVariants}
              className="col-span-2 bg-white rounded-xl p-2.5 md:p-3.5 border border-black/5"
            >
              <div className="text-[10px] md:text-[11px] font-bold text-gray-700 mb-1.5 md:mb-2">
                Traffic Volume — 24h
              </div>

              <motion.svg
                className="w-full h-14 md:h-20"
                viewBox="0 0 200 70"
                fill="none"
              >
                <motion.path
                  d="M0,55 C20,48 35,30 55,28 C75,26 90,42 110,35 C130,28 145,15 165,12 C180,10 195,18 200,20"
                  stroke="#6C5CE7"
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                />
              </motion.svg>
            </motion.div>

            {/* Latency Chart */}
            <motion.div
              variants={itemVariants}
              className="col-span-2 bg-white rounded-xl p-2.5 md:p-3.5 border border-black/5"
            >
              <div className="text-[10px] md:text-[11px] font-bold text-gray-700 mb-1.5 md:mb-2">
                Service Latency — P95
              </div>

              <motion.svg
                className="w-full h-14 md:h-20"
                viewBox="0 0 200 70"
                fill="none"
              >
                <motion.path
                  d="M0,40 C15,38 30,50 50,45 C70,40 85,20 105,22 C125,24 140,38 160,30 C175,24 190,22 200,20"
                  stroke="#E84393"
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                />
              </motion.svg>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardMockUp;