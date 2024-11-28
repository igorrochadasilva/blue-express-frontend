'use client';

import { useEffect, useState } from 'react';
import PeriodFilter from './PeriodFilter/PeriodFilter';
import Content from '../../Global/Content/Content';
import RequestsChart from './RequestsChart/RequestsChart';
import { RequestsData } from '../../../hooks/useGetRequests';
import RequestsList from './RequestsList/RequestsList';

interface DashBoardContent {
  requestsData: RequestsData;
}

const DashBoardContent = ({ requestsData }: DashBoardContent) => {
  console.log('🚀 ~ DashBoardContent ~ requestsData:', requestsData);
  const [filteredRequests, setFilteredRequests] = useState<RequestsData>([]);
  const [selectPeriodValue, setSelectPeriodValue] = useState<string>('');

  const filterRequestByPeriod = () => {
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
  };

  const handleSelectPeriodChange = (value: string) =>
    setSelectPeriodValue(value);

  useEffect(() => {
    if (requestsData.length > 0) {
      selectPeriodValue
        ? filterRequestByPeriod()
        : setFilteredRequests(requestsData);
    }
  }, [requestsData, selectPeriodValue]);

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
export default DashBoardContent;
