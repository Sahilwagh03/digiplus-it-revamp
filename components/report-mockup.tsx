'use client';

import React from 'react';

const AiReportsMockUp: React.FC = () => {
  return (
    <div className="product-panel__visual reveal-right">
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

        {/* Body */}
        <div className="p-1.5">
          <div className="bg-[#f8f9fe] rounded-xl p-3 grid grid-cols-2 gap-2">

            {/* Network Health Score */}
            <div className="bg-white rounded-xl p-3.5 border border-black/[0.05]">
              <div className="flex justify-between items-center mb-2.5">
                <div className="text-[11px] font-bold text-gray-700">
                  Network Health Score
                </div>
                <span className="px-1.5 py-0.5 rounded text-[8px] font-bold bg-violet-100 text-violet-700">
                  AI
                </span>
              </div>

              <div className="text-lg font-bold text-gray-900">
                94.7
                <span className="text-sm text-gray-400 font-normal">/100</span>
              </div>

              <div className="text-[9px] text-gray-500 mt-0.5">
                ↑ +2.3pts vs last month
              </div>

              <div className="flex items-center gap-1.5 mt-2.5">
                <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-[#6C5CE7]"
                    style={{ width: '94.7%' }}
                  />
                </div>
                <span className="text-[9px] font-semibold text-gray-700">
                  95%
                </span>
              </div>
            </div>

            {/* MTTR */}
            <div className="bg-white rounded-xl p-3.5 border border-black/[0.05]">
              <div className="flex justify-between items-center mb-2.5">
                <div className="text-[11px] font-bold text-gray-700">
                  Incident MTTR
                </div>
                <span className="px-1.5 py-0.5 rounded text-[8px] font-bold bg-violet-100 text-violet-700">
                  Predictive
                </span>
              </div>

              <div className="text-lg font-bold text-gray-900">
                18
                <span className="text-sm text-gray-400 font-normal">
                  {' '}min avg
                </span>
              </div>

              <div className="text-[9px] text-gray-500 mt-0.5">
                ↓ 34% improvement YoY
              </div>

              <div className="text-[8px] text-gray-400 mt-2.5 leading-relaxed">
                AI-predicted resolution window:{' '}
                <strong className="text-gray-600">12–22 min</strong>
                <br />
                Confidence:{' '}
                <strong className="text-gray-600">89%</strong>
              </div>
            </div>

            {/* Capacity by Region */}
            <div className="bg-white rounded-xl p-3.5 border border-black/[0.05]">
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
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${region.value}%`,
                        backgroundColor: region.color,
                      }}
                    />
                  </div>

                  <span className="text-[9px] font-semibold text-gray-700">
                    {region.value}%
                  </span>
                </div>
              ))}
            </div>

            {/* Report Status */}
            <div className="bg-white rounded-xl p-3.5 border border-black/[0.05]">
              <div className="text-[11px] font-bold text-gray-700 mb-2">
                Report Status
              </div>

              {[
                { name: 'Daily Ops Report', status: 'Sent', style: 'bg-emerald-100 text-emerald-600' },
                { name: 'Weekly KPI Digest', status: 'Sent', style: 'bg-emerald-100 text-emerald-600' },
                { name: 'SLA Board Report', status: 'Pending', style: 'bg-amber-100 text-amber-600' },
                { name: 'Anomaly Alert', status: '3 new', style: 'bg-red-100 text-red-600' },
              ].map((report, i) => (
                <div key={i} className="flex justify-between items-center text-[9px] mb-1.5">
                  <span>{report.name}</span>
                  <span className={`px-1.5 py-0.5 rounded font-bold ${report.style}`}>
                    {report.status}
                  </span>
                </div>
              ))}
            </div>

            {/* AI-Detected Anomalies */}
            <div className="col-span-2 bg-white rounded-xl p-3.5 border border-black/[0.05]">
              <div className="flex justify-between items-center mb-2">
                <div className="text-[11px] font-bold text-gray-700">
                  AI-Detected Anomalies
                </div>
                <span className="px-1.5 py-0.5 rounded text-[8px] font-bold bg-violet-100 text-violet-700">
                  Live
                </span>
              </div>

              {[
                { text: 'DXB-RING-07 — Packet loss spike', level: 'HIGH', color: 'text-red-500' },
                { text: 'SIN-EDGE-03 — BGP flap detected', level: 'MED', color: 'text-amber-500' },
                { text: 'NYC-POP-02 — Latency trending up', level: 'LOW', color: 'text-gray-500' },
              ].map((anomaly, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center py-1.5 border-b border-gray-100 last:border-none text-[9px]"
                >
                  <span>{anomaly.text}</span>
                  <span className={`font-bold ${anomaly.color}`}>
                    {anomaly.level}
                  </span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AiReportsMockUp;