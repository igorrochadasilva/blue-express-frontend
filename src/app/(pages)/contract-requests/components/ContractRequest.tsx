'use client';

import { RequestsData } from '@/hooks/useGetRequests';
import { useEffect, useState, useCallback } from 'react';
import ContractsList from './ContractsList/ContractsList';
import { Content } from '@/components/Content/Content';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { contractTypesOptions } from '@/libs/options';
import { Button } from '@/components/ui/button';

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
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event: {
    target: { checked: boolean | ((prevState: boolean) => boolean) };
  }) => setIsChecked(event.target.checked);

  const applyFilters = useCallback(() => {
    const { requestId, status } = selectedFilters;

    const filtered = requestsData.filter((request) => {
      const matchesRequestId = !requestId || String(request.id) === requestId;
      const matchesStatus =
        status === 'all' ? true : !status || request.status === status;

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
      <div className="flex flex-row gap-4 mb-12 items-center text-sm">
        <div className="flex flex-col w-[200px] gap-2 text-be_second_color">
          <Label htmlFor="Status">Request Id</Label>
          <Input
            type="text"
            placeholder="search the contract by id"
            onChange={(e) =>
              handleFilterChange('requestId', e.currentTarget.value)
            }
          />
        </div>
        <div className="flex flex-col w-[200px] gap-2 text-be_second_color">
          <Label>Status</Label>
          <Select
            onValueChange={(value) => handleFilterChange('status', value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a period" />
            </SelectTrigger>
            <SelectContent>
              {contractTypesOptions?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option?.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* <div className="flex flex-col w-[260px] gap-2 text-be_second_color">
          <label htmlFor="Status" className="font-semibold">
            Close to expiration
          </label>
          <input
            className="border-2 border-[#e3e3e3] px-4 py-2 rounded-lg w-[20px] h-[35px]"
            type="checkbox"
            id="myCheckbox"
            name="myCheckbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
        </div> */}
        <div className="flex justify-end flex-1">
          <Button size={'lg'} className="bg-blue-700  hover:bg-blue-600/90">
            Issue Report
          </Button>
        </div>
      </div>
      <ContractsList requests={filteredRequests} />
    </Content>
  );
};

export default ContractRequestContent;
