'use client';

import React, { useEffect } from 'react';
import {
  motion,
  Variants,
  useMotionValue,
  useTransform,
  animate,
} from 'framer-motion';

const container: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

/* Counter Component */
const Counter = ({
  to,
  decimals = 0,
  suffix = '',
}: {
  to: number;
  decimals?: number;
  suffix?: string;
}) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) =>
    latest.toFixed(decimals)
  );

  useEffect(() => {
    const controls = animate(count, to, {
      duration: 1.5,
      ease: [0.16, 1, 0.3, 1],
    });
    return controls.stop;
  }, [count, to]);

  return (
    <motion.span>
      {rounded && <motion.span>{rounded}</motion.span>}
      {suffix}
    </motion.span>
  );
};

const AiReportsMockUp: React.FC = () => {
  return (
    <motion.div
      className="product-panel__visual reveal-right"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.12),0_0_0_1px_rgba(0,0,0,0.05)] overflow-hidden bg-[#f0f2f7]">

        {/* Titlebar */}
        <div className="bg-[#e8eaf0] px-4 py-2.5 flex items-center gap-2 border-b border-black/[0.06]">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28CA41]" />
          <div className="flex-1 bg-white rounded-md px-3 py-1 mx-3 text-[11px] font-mono text-gray-400">
            reports.digiplus.io/ai-engine
          </div>
        </div>

        <div className="p-1.5">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-[#f8f9fe] rounded-xl p-3 grid grid-cols-2 gap-2"
          >

            {/* Network Health Score */}
            <motion.div variants={fadeUp} className="bg-white rounded-xl p-3.5 border border-black/[0.05]">
              <div className="flex justify-between items-center mb-2.5">
                <div className="text-[11px] font-bold text-gray-700">
                  Network Health Score
                </div>
                <span className="px-1.5 py-0.5 rounded text-[8px] font-bold bg-violet-100 text-violet-700">
                  AI
                </span>
              </div>

              <div className="text-lg font-bold text-gray-900">
                <Counter to={94.7} decimals={1} />
                <span className="text-sm text-gray-400 font-normal">/100</span>
              </div>

              <div className="text-[9px] text-gray-500 mt-0.5">
                ↑ +2.3pts vs last month
              </div>

              <div className="flex items-center gap-1.5 mt-2.5">
                <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-[#6C5CE7]"
                    initial={{ width: 0 }}
                    whileInView={{ width: '94.7%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                  />
                </div>
                <span className="text-[9px] font-semibold text-gray-700">
                  95%
                </span>
              </div>
            </motion.div>

            {/* MTTR */}
            <motion.div variants={fadeUp} className="bg-white rounded-xl p-3.5 border border-black/[0.05]">
              <div className="text-lg font-bold text-gray-900">
                <Counter to={18} />{' '}
                <span className="text-sm text-gray-400 font-normal">min avg</span>
              </div>
            </motion.div>

            {/* Capacity by Region */}
            <motion.div variants={fadeUp} className="bg-white rounded-xl p-3.5 border border-black/[0.05]">
              <div className="text-[11px] font-bold text-gray-700 mb-2">
                Capacity by Region
              </div>

              {[
                { label: 'EMEA', value: 72, color: '#6C5CE7' },
                { label: 'APAC', value: 85, color: '#E84393' },
                { label: 'AMER', value: 58, color: '#4A90E2' },
                { label: 'MEA', value: 91, color: '#FF6B6B' },
              ].map((region, i) => (
                <div key={i} className="flex items-center gap-1.5 mb-1.5">
                  <span className="text-[9px] w-9 text-gray-700">
                    {region.label}
                  </span>

                  <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: region.color }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${region.value}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: i * 0.1 }}
                    />
                  </div>

                  <span className="text-[9px] font-semibold text-gray-700">
                    {region.value}%
                  </span>
                </div>
              ))}
            </motion.div>

            {/* Report Status */}
            <motion.div variants={fadeUp} className="bg-white rounded-xl p-3.5 border border-black/[0.05]">
              {[
                { name: 'Daily Ops Report', status: 'Sent', style: 'bg-emerald-100 text-emerald-600' },
                { name: 'Weekly KPI Digest', status: 'Sent', style: 'bg-emerald-100 text-emerald-600' },
                { name: 'SLA Board Report', status: 'Pending', style: 'bg-amber-100 text-amber-600' },
                { name: 'Anomaly Alert', status: '3 new', style: 'bg-red-100 text-red-600' },
              ].map((report, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="flex justify-between items-center text-[9px] mb-1.5"
                >
                  <span>{report.name}</span>
                  <span className={`px-1.5 py-0.5 rounded font-bold ${report.style}`}>
                    {report.status}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* AI-Detected Anomalies */}
            <motion.div variants={fadeUp} className="col-span-2 bg-white rounded-xl p-3.5 border border-black/[0.05]">
              {[
                { text: 'DXB-RING-07 — Packet loss spike', level: 'HIGH', color: 'text-red-500' },
                { text: 'SIN-EDGE-03 — BGP flap detected', level: 'MED', color: 'text-amber-500' },
                { text: 'NYC-POP-02 — Latency trending up', level: 'LOW', color: 'text-gray-500' },
              ].map((anomaly, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="flex justify-between items-center py-1.5 border-b border-gray-100 last:border-none text-[9px]"
                >
                  <span>{anomaly.text}</span>
                  <span className={`font-bold ${anomaly.color}`}>
                    {anomaly.level}
                  </span>
                </motion.div>
              ))}
            </motion.div>

          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default AiReportsMockUp;