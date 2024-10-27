"use client"
import React, { useState, Suspense } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('./chart'), {
  ssr: false,
  loading: () => <div className="h-[400px] w-full flex items-center justify-center">Loading chart...</div>
});

// ... keep all the interfaces and other code ...

const ModelDashboard = () => {
  // ... keep all the state and calculation code ...

  return (
    <Card className="w-full max-w-7xl bg-black text-white border-none shadow-none">
      <CardHeader>
        <CardTitle className="text-2xl">Business Model Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row gap-8">
          <div className="w-1/3 space-y-6">
            <div className="flex flex-col gap-4">
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
          </div>
          
          <div className="w-2/3">
            <Suspense fallback={<div className="h-[400px] w-full flex items-center justify-center">Loading chart...</div>}>
              <Chart data={calculateMetrics()} formatCurrency={formatCurrency} />
            </Suspense>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ModelDashboard;