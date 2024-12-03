'use client';

import { useEffect, useState, useCallback } from 'react';
import { Request } from '../../../../types/global/types';
import Content from '../../../../components/Global/Content/Content';
import InputsFilter from '../../../../components/Global/InputsFilter';
import ContractsList from './ContractsList/ContractsList';
import { RequestsData } from '../../../../hooks/useGetRequests';

interface ContractRequestContentProps {
  requestsData: RequestsData;
}

const ContractRequestContent = ({
  requestsData,
}: ContractRequestContentProps) => {
  const [filteredRequests, setFilteredRequests] =
    useState<RequestsData>(requestsData);
  const [selectedFilters, setSelectedFilters] = useState({
    requestId: '',
    status: '',
  });

  const applyFilters = useCallback(() => {
    const { requestId, status } = selectedFilters;

    const filtered = requestsData.filter((request: Request) => {
      const matchesRequestId = !requestId || String(request.id) === requestId;
      const matchesStatus = !status || request.status === status;

      return matchesRequestId && matchesStatus;
    });

    setFilteredRequests(filtered);
  }, [requestsData, selectedFilters]);

  const handleFilterChange = (
    key: keyof typeof selectedFilters,
    value: string
  ) => {
    setSelectedFilters((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  return (
    <Content>
      <InputsFilter.Root>
        <InputsFilter.FilterRequestId
          handleSelectRequestIdChange={(value) =>
            handleFilterChange('requestId', value)
          }
        />
        <InputsFilter.FilterStatus
          handleSelectRequestStatusChange={(value) =>
            handleFilterChange('status', value)
          }
        />
        <InputsFilter.CloseExpiration />
        <InputsFilter.BtnIssueReport />
      </InputsFilter.Root>
      <ContractsList requests={filteredRequests} />
    </Content>
  );
};

export default ContractRequestContent;
