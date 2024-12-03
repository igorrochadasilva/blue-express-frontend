'use client';

import { SubmitHandler, useForm } from 'react-hook-form';

import Content from '../../../../Global/Content/Content';
import { generateDefaultValueUseForm } from '../../../../../libs/utils';
import { v4 as uuid4 } from 'uuid';
import { FormDataInputs } from '@/types/requests/requests';
import { UserSession } from '@/types/auth/sign';
import { Request as RequestData } from '@/types/global/types';
import Request from '@/components/Pages/Requests/Request/index';
import { RequestStatusEnum, RequestsTitleEnum } from '@/types/requests/enums';

interface RequestFormProps {
  user: UserSession;
  isLoading: boolean;
  requestData?: RequestData;
  FormDataInputs: FormDataInputs;
  onSubmitForm: SubmitHandler<RequestData>;
  handleApproverModal?: (() => void) | undefined;
  handleModalStatus?: ((status: string) => void) | undefined;
}

const RequestForm = ({
  user,
  isLoading,
  requestData,
  FormDataInputs,
  onSubmitForm,
  handleApproverModal,
  handleModalStatus,
}: RequestFormProps) => {
  const generatedDefaultValues = requestData
    ? generateDefaultValueUseForm(requestData)
    : {};

  const { register, watch, handleSubmit, setValue, getValues } =
    useForm<RequestData>({
      mode: 'all',
      defaultValues: {
        ...generatedDefaultValues,
        requesterName: requestData ? requestData?.requesterName : user?.name,
      },
    });

  const showApproverButtons =
    user?.role !== 1 &&
    requestData?.status === RequestStatusEnum.WAITING_FOR_APPROVAL;

  const inputContractTotalValue = watch('contractTotalValue');
  const inputDollarExchangeRate = watch('dollarExchangeRate');
  const inputTotalValueUSD =
    Number(inputContractTotalValue) / Number(inputDollarExchangeRate);

  if (
    !requestData?.title.includes(
      RequestsTitleEnum.DISTRIBUTOR_REPRESENTATIVES_CONTRACT
    )
  ) {
    setValue('totalValueUSD', String(inputTotalValueUSD));
  }

  return (
    <Request.Form onSubmitForm={handleSubmit(onSubmitForm)}>
      <Content>
        <div className="flex flex-col gap-4">
          {FormDataInputs.map((data) => (
            <Request.InputGroup key={uuid4()}>
              {data.map((item) => {
                if (item.type === 'input') {
                  return (
                    <Request.Input
                      key={uuid4()}
                      labelText={item.labelText}
                      inputName={item.inputName}
                      inputType={item.inputType}
                      required={item.required}
                      readonly={item.id === 1 ? true : false}
                      register={register}
                      getValues={getValues}
                    />
                  );
                } else {
                  return (
                    <Request.Select
                      key={item.id}
                      inputName={item.inputName}
                      labelText={item.labelText}
                      options={item.options}
                      register={register}
                      required={item.required}
                    />
                  );
                }
              })}
            </Request.InputGroup>
          ))}
        </div>
      </Content>
      {showApproverButtons ? (
        <Request.ApproverButtons
          handleApproverModal={handleApproverModal}
          handleModalStatus={handleModalStatus}
        />
      ) : (
        <Request.GroupButtons isLoading={isLoading} />
      )}
    </Request.Form>
  );
};

export default RequestForm;
