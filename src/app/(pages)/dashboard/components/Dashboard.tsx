'use client';

import { useCallback, useEffect, useState } from 'react';
import PeriodFilter from './PeriodFilter/PeriodFilter';

import RequestsChart from './RequestsChart/RequestsChart';
import RequestsList from './RequestsList/RequestsList';
import { RequestsData } from '@/hooks/useGetRequests';
import Content from '@/components/Content/Content';

interface DashBoardProps {
  requestsData: RequestsData;
}

export const DashBoard = ({ requestsData }: DashBoardProps) => {
  const [filteredRequests, setFilteredRequests] = useState<RequestsData>([]);
  const [selectPeriodValue, setSelectPeriodValue] = useState<string>('');

  const filterRequestByPeriod = useCallback(() => {
    if (selectPeriodValue !== 'all') {
      const days = Number(selectPeriodValue);
      const thresholdDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

      const filterRequests = requestsData.filter((request) => {
        const requestDate = new Date(request.createdAt);
        return requestDate >= thresholdDate;
      });

      setFilteredRequests(filterRequests);
    } else {
      setFilteredRequests(requestsData);
    }
  }, [selectPeriodValue, requestsData, setFilteredRequests]);

  const handleSelectPeriodChange = (value: string) =>
    setSelectPeriodValue(value);

  useEffect(() => {
    if (requestsData.length > 0) {
      selectPeriodValue
        ? filterRequestByPeriod()
        : setFilteredRequests(requestsData);
    }
  }, [requestsData, selectPeriodValue, filterRequestByPeriod]);

  return (
    <>
      <PeriodFilter handleSelectPeriodChange={handleSelectPeriodChange} />
      <Content>
        <RequestsChart requests={filteredRequests} />
      </Content>
      <Content>
        <RequestsList requests={filteredRequests} />
      </Content>
    </>
  );
};
