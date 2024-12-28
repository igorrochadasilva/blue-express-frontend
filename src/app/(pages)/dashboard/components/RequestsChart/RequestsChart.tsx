import { useEffect, useState } from 'react';
import { Chart } from './Chart';

import { barData } from '@/types/dashboard/dashboard';
import { RequestsData } from '@/hooks/useGetRequests';

interface RequestsChartProps {
  requests: RequestsData;
}

const RequestsChart = ({ requests }: RequestsChartProps) => {
  const [barsData, setBarsData] = useState<barData[]>([]);

  useEffect(() => {
    const statusTypes = [
      {
        key: 'waiting for approval',
        label: 'waiting approval',
        color: '#F3AF25',
      },
      { key: 'approved', label: 'approved', color: '#00D134' },
      { key: 'disapproved', label: 'disapproved', color: '#EB1400' },
      {
        key: 'waiting for information',
        label: 'waiting information',
        color: '#F3AF25',
      },
      { key: 'sketch', label: 'sketch', color: '#98A4AE' },
    ];

    const statusCounts = statusTypes.map((status) => ({
      ...status,
      count: requests.filter((request) => request.status === status.key).length,
    }));

    const maxCount = Math.max(...statusCounts.map((status) => status.count));

    const chartData = statusCounts.map((status) => ({
      text: status.label,
      color: status.color,
      barSize: (status.count * 240) / maxCount,
      qtd: status.count,
    }));

    setBarsData(chartData);
  }, [requests]);

  return (
    <Chart.Root>
      <Chart.Title text="Total status of requests" />
      <Chart.Content>
        {barsData.length > 0 ? (
          barsData?.map((bar: barData, i: number) => (
            <Chart.Bar
              key={i}
              barColor={bar.color}
              barSize={bar.barSize}
              barText={bar.text}
              quantity={bar.qtd}
            />
          ))
        ) : (
          <Chart.Loading text="loading chart..." />
        )}
      </Chart.Content>
    </Chart.Root>
  );
};
export default RequestsChart;
