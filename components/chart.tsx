"use client"
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LabelList } from 'recharts';

interface ChartProps {
  data: any[];
  formatCurrency: (value: number) => string;
}

const Chart = ({ data, formatCurrency }: ChartProps) => {
  return (
    <div className="h-[400px] w-full">
      <BarChart
        width={600}
        height={400}
        data={data}
        margin={{ top: 20, right: 30, left: 60, bottom: 5 }}
      >
        <XAxis dataKey="name" />
        <YAxis 
          tickFormatter={formatCurrency}
          label={{ 
            value: "Revenue (USD)", 
            angle: -90, 
            position: 'insideLeft',
            offset: -45
          }}
        />
        <Tooltip formatter={formatCurrency} />
        <Legend />
        <Bar dataKey="bhnShare" fill="#3B82F6" name="BHN Share">
          <LabelList 
            dataKey="bhnShare" 
            position="top" 
            formatter={formatCurrency}
            style={{ fill: '#374151' }}
          />
        </Bar>
      </BarChart>
    </div>
  );
};

export default Chart;