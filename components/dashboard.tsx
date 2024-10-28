"use client"
import React, { useState, Suspense } from 'react';
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('./chart'), {
  ssr: false,
  loading: () => <div className="h-[500px] w-full flex items-center justify-center">Loading chart...</div>
});

interface Metrics {
  targetedCustomers: number;
  servedCustomers: number;
  annualImpressions: number;
  offerActivations: number;
  salesGenerated: number;
  grossRevenue: number;
}

interface MetricsRecord {
  [key: string]: number;
}

interface BaseMetrics {
  tier1: Metrics;
  tier2: Metrics;
  tier3: Metrics;
}

const ModelDashboard = () => {
  const [accountParams, setAccountParams] = useState({
    tier1: 3,
    tier2: 10,
    tier3: 20
  });
  
  const [bhnShare] = useState(0.5); // 50% revenue share

  const baseMetrics: BaseMetrics = {
    tier1: {
      targetedCustomers: 50000000,
      servedCustomers: 42000000,
      annualImpressions: 1200000000,
      offerActivations: 7800000,
      salesGenerated: 130000000,
      grossRevenue: 3100000
    },
    tier2: {
      targetedCustomers: 50000000,
      servedCustomers: 40000000,
      annualImpressions: 900000000,
      offerActivations: 5700000,
      salesGenerated: 100000000,
      grossRevenue: 1900000
    },
    tier3: {
      targetedCustomers: 50000000,
      servedCustomers: 36000000,
      annualImpressions: 650000000,
      offerActivations: 4100000,
      salesGenerated: 175000000,
      grossRevenue: 1400000
    }
  };

  const calculateMetrics = () => {
    const tier1Metrics = Object.entries(baseMetrics.tier1).reduce<MetricsRecord>((acc, [key, value]) => {
      acc[key] = value * accountParams.tier1;
      return acc;
    }, {});
    
    const tier2Metrics = Object.entries(baseMetrics.tier2).reduce<MetricsRecord>((acc, [key, value]) => {
      acc[key] = value * accountParams.tier2;
      return acc;
    }, {});
    
    const tier3Metrics = Object.entries(baseMetrics.tier3).reduce<MetricsRecord>((acc, [key, value]) => {
      acc[key] = value * accountParams.tier3;
      return acc;
    }, {});

    return [
      {
        name: 'Tier 1',
        accounts: accountParams.tier1,
        bhnShare: tier1Metrics.grossRevenue * bhnShare,
      },
      {
        name: 'Tier 2',
        accounts: accountParams.tier2,
        bhnShare: tier2Metrics.grossRevenue * bhnShare,
      },
      {
        name: 'Tier 3',
        accounts: accountParams.tier3,
        bhnShare: tier3Metrics.grossRevenue * bhnShare,
      }
    ];
  };

  const formatCurrency = (value: number) => {
    return `$${value.toLocaleString()}`;
  };

   return (
    <div className="flex flex-col w-full max-w-[2000px] mx-auto bg-black text-white">
      <h1 className="text-2xl font-bold p-8">
        BHN Revenue Share: {formatCurrency(calculateMetrics().reduce((sum, item) => sum + item.bhnShare, 0))}
      </h1>
      <div className="flex flex-row px-8">
        {/* Left Column - Sliders */}
        <div className="w-1/3 pr-12 flex flex-col space-y-8">
          <div>
            <label htmlFor="tier1" className="block text-sm font-medium mb-1">
              Tier 1 Accounts (0-10): {accountParams.tier1}
            </label>
            <input
              type="range"
              id="tier1"
              min="0"
              max="10"
              value={accountParams.tier1}
              onChange={(e) => setAccountParams({
                ...accountParams,
                tier1: parseInt(e.target.value)
              })}
              className="w-full accent-[#E35F00]"
            />
          </div>
          <div>
            <label htmlFor="tier2" className="block text-sm font-medium mb-1">
              Tier 2 Accounts (0-50): {accountParams.tier2}
            </label>
            <input
              type="range"
              id="tier2"
              min="0"
              max="50"
              value={accountParams.tier2}
              onChange={(e) => setAccountParams({
                ...accountParams,
                tier2: parseInt(e.target.value)
              })}
              className="w-full accent-[#E35F00]"
            />
          </div>
          <div>
            <label htmlFor="tier3" className="block text-sm font-medium mb-1">
              Tier 3 Accounts (0-100): {accountParams.tier3}
            </label>
            <input
              type="range"
              id="tier3"
              min="0"
              max="100"
              value={accountParams.tier3}
              onChange={(e) => setAccountParams({
                ...accountParams,
                tier3: parseInt(e.target.value)
              })}
              className="w-full accent-[#E35F00]"
            />
          </div>
        </div>

        {/* Right Column - Chart */}
        <div className="w-2/3">
          <Suspense fallback={<div className="h-[600px] w-full flex items-center justify-center">Loading chart...</div>}>
            <Chart data={calculateMetrics()} formatCurrency={formatCurrency} />
          </Suspense>
        </div>
      </div>
    </div>
 );
};

export default ModelDashboard;