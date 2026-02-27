'use client';

import React from 'react';

const DashboardMockUp: React.FC = () => {
  return (
    <div className="product-panel__visual reveal-right w-full">
      <div className="rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.12),0_0_0_1px_rgba(0,0,0,0.05)] overflow-hidden bg-[#f0f2f7]">

        {/* Browser Header */}
        <div className="bg-[#e8eaf0] px-3 md:px-4 py-2 md:py-2.5 flex items-center gap-1.5 md:gap-2 border-b border-black/6">
          <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-[#FF5F57] flex-shrink-0" />
          <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-[#FFBD2E] flex-shrink-0" />
          <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-[#28CA41] flex-shrink-0" />
          <div className="flex-1 bg-white rounded-md px-2 md:px-3 py-0.5 md:py-1 mx-2 md:mx-3 text-[9px] md:text-[11px] font-mono text-gray-400 truncate">
            app.digiplus.io/dashboard
          </div>
        </div>

        {/* Body */}
        <div className="p-1.5 md:p-2">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-1.5 md:gap-2 p-2 md:p-3 bg-[#f8f9fe] rounded-xl">

            {/* KPI Cards — 2 cols on mobile, 4 on md+ */}
            {[
              { title: 'Network Uptime',  value: '99.97%', sub: '↑ 0.02% vs last week', color: 'text-emerald-500' },
              { title: 'Active Nodes',    value: '14,208',  sub: '↑ 127 new today',      color: 'text-emerald-500' },
              { title: 'Incidents Open',  value: '3',       sub: '↓ 12 resolved',        color: 'text-amber-400'   },
              { title: 'SLA Compliance',  value: '98.4%',   sub: '↑ On target',          color: 'text-emerald-500' },
            ].map((card, i) => (
              <div key={i} className="bg-white rounded-xl p-2.5 md:p-3.5 border border-black/5">
                <div className="text-[9px] md:text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-0.5 md:mb-1 leading-tight">
                  {card.title}
                </div>
                <div className="text-lg md:text-[22px] font-bold text-gray-900 leading-none mb-0.5">
                  {card.value}
                </div>
                <div className={`text-[9px] md:text-[10px] font-semibold ${card.color}`}>
                  {card.sub}
                </div>
              </div>
            ))}

            {/* Traffic Chart — full width on mobile, half on md+ */}
            <div className="col-span-2 bg-white rounded-xl p-2.5 md:p-3.5 border border-black/5">
              <div className="text-[10px] md:text-[11px] font-bold text-gray-700 mb-1.5 md:mb-2">
                Traffic Volume — 24h
              </div>
              <svg className="w-full h-14 md:h-20" viewBox="0 0 200 70" fill="none">
                <defs>
                  <linearGradient id="chartGrad1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6C5CE7" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#6C5CE7" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,55 C20,48 35,30 55,28 C75,26 90,42 110,35 C130,28 145,15 165,12 C180,10 195,18 200,20 L200,70 L0,70 Z"
                  fill="url(#chartGrad1)"
                />
                <path
                  d="M0,55 C20,48 35,30 55,28 C75,26 90,42 110,35 C130,28 145,15 165,12 C180,10 195,18 200,20"
                  stroke="#6C5CE7" strokeWidth="2" fill="none"
                />
                <path
                  d="M0,60 C20,55 35,45 55,43 C75,41 90,50 110,48 C130,46 145,38 165,36 C180,34 195,40 200,42"
                  stroke="#4A90E2" strokeWidth="1.5" fill="none" strokeDasharray="4 2"
                />
              </svg>
            </div>

            {/* Latency Chart — full width on mobile, half on md+ */}
            <div className="col-span-2 bg-white rounded-xl p-2.5 md:p-3.5 border border-black/5">
              <div className="text-[10px] md:text-[11px] font-bold text-gray-700 mb-1.5 md:mb-2">
                Service Latency — P95
              </div>
              <svg className="w-full h-14 md:h-20" viewBox="0 0 200 70" fill="none">
                <defs>
                  <linearGradient id="latGrad1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#E84393" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#E84393" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,40 C15,38 30,50 50,45 C70,40 85,20 105,22 C125,24 140,38 160,30 C175,24 190,22 200,20 L200,70 L0,70 Z"
                  fill="url(#latGrad1)"
                />
                <path
                  d="M0,40 C15,38 30,50 50,45 C70,40 85,20 105,22 C125,24 140,38 160,30 C175,24 190,22 200,20"
                  stroke="#E84393" strokeWidth="2" fill="none"
                />
              </svg>
            </div>

            {/* Table — full width, hide Vendor col on mobile */}
            <div className="col-span-2 md:col-span-4 bg-white rounded-xl p-2.5 md:p-3.5 border border-black/5 text-[9px] md:text-[10px]">
              {/* Header */}
              <div className="grid grid-cols-3 md:grid-cols-4 py-1.5 border-b border-gray-100 font-semibold text-gray-700">
                <span>Site</span>
                <span className="hidden md:block">Vendor</span>
                <span>Latency</span>
                <span className="text-right md:text-left">Status</span>
              </div>

              {[
                { site: 'AMS-CORE-01', vendor: 'Nokia',    latency: '8ms',  status: 'OK',    bg: 'bg-emerald-100', text: 'text-emerald-600' },
                { site: 'LDN-EDGE-14', vendor: 'Ericsson', latency: '12ms', status: 'OK',    bg: 'bg-emerald-100', text: 'text-emerald-600' },
                { site: 'DXB-RING-07', vendor: 'Huawei',   latency: '38ms', status: 'WARN',  bg: 'bg-amber-100',   text: 'text-amber-600'   },
                { site: 'SIN-CORE-02', vendor: 'Cisco',    latency: '95ms', status: 'ALERT', bg: 'bg-red-100',     text: 'text-red-600'     },
              ].map((row, i) => (
                <div
                  key={i}
                  className="grid grid-cols-3 md:grid-cols-4 items-center py-1.5 border-b border-gray-100 last:border-none"
                >
                  <span className="font-medium truncate pr-1">{row.site}</span>
                  <span className="hidden md:block text-gray-500">{row.vendor}</span>
                  <span className="text-gray-600">{row.latency}</span>
                  <span className="flex md:block justify-end">
                    <span className={`inline-block px-1.5 py-0.5 rounded text-[8px] md:text-[9px] font-bold ${row.bg} ${row.text}`}>
                      {row.status}
                    </span>
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

export default DashboardMockUp;