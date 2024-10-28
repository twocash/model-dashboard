"use client"
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LabelList } from 'recharts';

interface ChartProps {
  data: Array<{
    name: string;
    accounts: number;
    bhnShare: number;
  }>;
  formatCurrency: (value: number) => string;
}

const Chart = ({ data, formatCurrency }: ChartProps) => {
  return (
    <div className="h-[500px] w-full">
      <BarChart
  width={1000}
  height={600}
  data={data}
  margin={{ top: 20, right: 30, left: 60, bottom: 5 }}
>
        <XAxis 
          dataKey="name" 
          stroke="#FFFFFF"
          tick={{ fill: '#FFFFFF' }}
        />
        <YAxis 
          tickFormatter={formatCurrency}
          stroke="#FFFFFF"
          tick={{ fill: '#FFFFFF' }}
          label={{ 
            value: "Revenue (USD)", 
            angle: -90, 
            position: 'insideLeft',
            offset: -45,
            style: { fill: '#FFFFFF' }
          }}
        />
        <Tooltip 
          formatter={formatCurrency}
          contentStyle={{ 
            backgroundColor: '#000000', 
            border: '1px solid #E35F00',
            color: '#FFFFFF'
          }}
          labelStyle={{ color: '#FFFFFF' }}
        />
        <Legend 
          wrapperStyle={{ color: '#FFFFFF' }}
        />
        <Bar 
          dataKey="bhnShare" 
          fill="#E35F00" 
          name="BHN Share"
        >
          <LabelList 
            dataKey="bhnShare" 
            position="top" 
            formatter={formatCurrency}
            style={{ fill: '#FFFFFF' }}
          />
        </Bar>
      </BarChart>
    </div>
  );
};

export default Chart;