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
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', padding: '32px', backgroundColor: 'black', color: 'white' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '32px' }}>
        BHN Revenue Share: {formatCurrency(calculateMetrics().reduce((sum, item) => sum + item.bhnShare, 0))}
      </h1>
      <div style={{ display: 'flex', gap: '64px' }}>
        <div style={{ width: '300px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px' }}>
                Tier 1 Accounts (0-10): {accountParams.tier1}
              </label>
              <input
                type="range"
                min="0"
                max="10"
                value={accountParams.tier1}
                onChange={(e) => setAccountParams({
                  ...accountParams,
                  tier1: parseInt(e.target.value)
                })}
                style={{ width: '100%', accentColor: '#E35F00' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px' }}>
                Tier 2 Accounts (0-50): {accountParams.tier2}
              </label>
              <input
                type="range"
                min="0"
                max="50"
                value={accountParams.tier2}
                onChange={(e) => setAccountParams({
                  ...accountParams,
                  tier2: parseInt(e.target.value)
                })}
                style={{ width: '100%', accentColor: '#E35F00' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px' }}>
                Tier 3 Accounts (0-100): {accountParams.tier3}
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={accountParams.tier3}
                onChange={(e) => setAccountParams({
                  ...accountParams,
                  tier3: parseInt(e.target.value)
                })}
                style={{ width: '100%', accentColor: '#E35F00' }}
              />
            </div>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <Suspense fallback={<div style={{ height: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading chart...</div>}>
            <Chart data={calculateMetrics()} formatCurrency={formatCurrency} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default ModelDashboard;