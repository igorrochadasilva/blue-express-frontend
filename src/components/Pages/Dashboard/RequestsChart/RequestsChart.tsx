import { useEffect, useState } from 'react';
import { barData, IRequestBody } from '../../../../types/global/types';
import {
  filterRequestsByStatus,
  generateChartBarData,
} from '../../../../libs/utils';
import { Chart } from './Chart';

interface IRequestsChart {
  requests: IRequestBody[];
}

const RequestsChart = ({ requests }: IRequestsChart) => {
  const [barsData, setBarsData] = useState<barData[]>([]);

  useEffect(() => {
    const statusWaitingApprovalAmount = filterRequestsByStatus(
      requests,
      'waiting for approval'
    ).length;
    const statusApprovedAmount = filterRequestsByStatus(
      requests,
      'approved'
    ).length;
    const statusDisapprovedAmount = filterRequestsByStatus(
      requests,
      'disapproved'
    ).length;
    const statusWaitingInformationAmount = filterRequestsByStatus(
      requests,
      'waiting for information'
    ).length;
    const statusSketchAmount = filterRequestsByStatus(
      requests,
      'sketch'
    ).length;
    const statusAmounts = [
      statusWaitingApprovalAmount,
      statusApprovedAmount,
      statusDisapprovedAmount,
      statusWaitingInformationAmount,
      statusSketchAmount,
    ];

    const biggerAmount = Math.max(...statusAmounts);

    const chartData = generateChartBarData(
      statusWaitingApprovalAmount,
      statusWaitingInformationAmount,
      statusApprovedAmount,
      statusDisapprovedAmount,
      statusSketchAmount,
      biggerAmount
    );

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
