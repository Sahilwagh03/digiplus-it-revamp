"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

/* =======================
   Animated Counter Hook
======================= */

const useCountUp = (end: number, duration = 1.5, start = false) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percent = Math.min(progress / (duration * 1000), 1);
      setCount(Math.floor(percent * end));

      if (percent < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [start, end, duration]);

  return count;
};

/* =======================
   Main Component
======================= */

const DiscoveryPanel: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [isInView, controls]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={fadeUp}
      className="product-panel__visual"
    >
      <div className="rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.12),0_0_0_1px_rgba(0,0,0,0.05)] overflow-hidden bg-[#f0f2f7]">
        
        {/* Titlebar */}
        <div className="bg-[#e8eaf0] px-4 py-2.5 flex items-center gap-2 border-b border-black/[0.06]">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28CA41]" />
          <div className="flex-1 bg-white rounded-md px-3 py-1 mx-3 text-[11px] font-mono text-gray-400">
            network360.digiplus.io/discovery
          </div>
        </div>

        <div className="p-1.5">
          <motion.div
            variants={containerVariants}
            className="bg-[#f8f9fe] rounded-xl p-3 flex flex-col gap-2"
          >
            
            {/* KPI Row */}
            <motion.div variants={fadeUp} className="grid grid-cols-4 gap-2">
              <KpiCard title="Elements Discovered" value={82447} sub="+1,203 new today" valueColor="text-[#6C5CE7]" trigger={isInView} />
              <KpiCard title="Accuracy Rate" value={99} suffix="%" sub="AI-verified" valueColor="text-emerald-500" trigger={isInView} />
              <KpiCard title="Vendors Active" value={41} sub="Multi-vendor sync" valueColor="text-[#E84393]" trigger={isInView} />
              <KpiCard title="Audit Savings" value={85} suffix="%" sub="vs manual process" valueColor="text-[#FF6B6B]" trigger={isInView} />
            </motion.div>

            {/* Table */}
            <motion.div variants={fadeUp} className="bg-white rounded-xl p-3 border border-black/[0.05]">
              <div className="grid grid-cols-5 gap-1 pb-1.5 border-b border-gray-100 text-[9px] font-bold text-gray-700">
                <span>Network Element</span>
                <span>Vendor</span>
                <span>OSS State</span>
                <span>Discovered</span>
                <span>Status</span>
              </div>

              {[
                ["AMS-CORE-01","Nokia","Active","Active","SYNC","emerald"],
                ["LDN-EDGE-14","Ericsson","Active","Degraded","DELTA","amber"],
                ["DXB-RING-07","Huawei","Unknown","Active","CONFLICT","red"],
                ["SIN-CORE-02","Cisco","Active","Active","SYNC","emerald"],
              ].map((row, i) => (
                <motion.div key={i} variants={fadeUp}>
                  <TableRow
                    element={row[0]}
                    vendor={row[1]}
                    oss={row[2]}
                    discovered={row[3]}
                    status={row[4]}
                    statusColor={row[5] as any}
                    isLast={i === 3}
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* AI Strip */}
            <motion.div
              variants={fadeUp}
              className="bg-gradient-to-r from-[#6C5CE7]/10 to-[#E84393]/10 border border-[#6C5CE7]/20 rounded-xl px-3 py-2 flex items-center gap-2 text-[9px] text-gray-600"
            >
              <span className="bg-white border border-[#6C5CE7]/20 rounded-lg px-2 py-0.5 text-[9px] font-bold text-[#6C5CE7] flex-shrink-0">
                🤖 AI Insight
              </span>
              <span>
                3 conflict elements auto-resolved · Discovery cycle:{" "}
                <strong>4.2 min</strong> · Next sync in 58 min
              </span>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default DiscoveryPanel;

/* =======================
   KPI Card
======================= */

interface KpiCardProps {
  title: string;
  value: number;
  sub: string;
  valueColor: string;
  trigger: boolean;
  suffix?: string;
}

const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  sub,
  valueColor,
  trigger,
  suffix = "",
}) => {
  const count = useCountUp(value, 1.5, trigger);

  return (
    <div className="bg-white rounded-xl p-3 border border-black/[0.05] text-center">
      <div className="text-[9px] font-semibold uppercase tracking-wider text-gray-400 mb-1">
        {title}
      </div>
      <div className={`text-base font-bold ${valueColor}`}>
        {count.toLocaleString()}
        {suffix}
      </div>
      <div className="text-[9px] text-gray-400 mt-0.5">{sub}</div>
    </div>
  );
};

/* =======================
   Table Row
======================= */

interface TableRowProps {
  element: string;
  vendor: string;
  oss: string;
  discovered: string;
  status: string;
  statusColor: "emerald" | "amber" | "red";
  isLast?: boolean;
}

const TableRow: React.FC<TableRowProps> = ({
  element,
  vendor,
  oss,
  discovered,
  status,
  statusColor,
  isLast,
}) => {
  const colorMap = {
    emerald: "bg-emerald-100 text-emerald-600",
    amber: "bg-amber-100 text-amber-600",
    red: "bg-red-100 text-red-600",
  };

  return (
    <div
      className={`grid grid-cols-5 gap-1 items-center py-1.5 text-[9px] ${
        !isLast ? "border-b border-gray-100" : ""
      }`}
    >
      <span className="font-semibold">{element}</span>
      <span>{vendor}</span>
      <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold w-fit ${colorMap[statusColor]}`}>
        {oss}
      </span>
      <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold w-fit ${colorMap[statusColor]}`}>
        {discovered}
      </span>
      <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold w-fit ${colorMap[statusColor]}`}>
        {status}
      </span>
    </div>
  );
};