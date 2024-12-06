'use client';
import { v4 as uuid4 } from 'uuid';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  MaintenanceContract,
  UpdateMaintenanceContractDTO,
} from '@/types/requests/maintenance.contract';
import { UserSession } from '@/types/auth/sign';
import Request from '../../../components/Request';
import Content from '@/components/Global/Content/Content';
import { MaintenanceContractFormInputs } from '@/libs/Forms/MaintenanceContractFormInputs';
import ApproverModal from '@/components/Global/ApproverModal/ApproverModal';

interface MaintenanceContractIdProps {
  user: UserSession;
  maintenanceContractData: MaintenanceContract;
}

export const MaintenanceContractId = ({
  user,
  maintenanceContractData,
}: MaintenanceContractIdProps) => {
  console.log('🚀 ~ maintenanceContractData:', maintenanceContractData);

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showApproverModal, setShowApproverModal] = useState(false);
  const [modalStatus, setModalStatus] = useState('');
  const [justifyApproverModal, setJustifyApproverModal] = useState('');

  const { register, handleSubmit, getValues } =
    useForm<UpdateMaintenanceContractDTO>({
      mode: 'all',
      defaultValues: {
        ...maintenanceContractData,
        requesterId: maintenanceContractData.id,
        contractTotalValue: Number(maintenanceContractData.contractTotalValue),
        dollarExchangeRate: Number(maintenanceContractData.dollarExchangeRate),
        totalValueUSD: Number(maintenanceContractData.totalValueUSD),
        gm: Number(maintenanceContractData.gm),
        renewIndexPercentage: Number(
          maintenanceContractData.renewIndexPercentage
        ),
      },
    });

  const onSubmitForm: SubmitHandler<UpdateMaintenanceContractDTO> = async (
    data
  ) => {
    setIsLoading(true);
    // const response = await postMaintenanceContract(data);

    // notifyMessage({
    //   message: response?.data?.message ?? response?.message,
    //   statusCode: response.statusCode,
    // });

    // if (response.statusCode === 201) return router.push('/contract-requests');

    setIsLoading(false);
  };

  // const handleApproverActionOnRequest = async (statusAction: string) => {
  //   const data = {
  //     user: user,
  //     statusAction: statusAction,
  //     requestData: requestData,
  //     justify: justifyApproverModal,
  //     url: requestRouteType,
  //   };

  //   setIsLoading(true);

  //   const res = await createApproval(data);

  //   if (res.ok) {
  //     notifySuccess(res);
  //     router.push('/contract-requests');
  //   } else {
  //     res ? notifyError(res.message) : notifyDefaultError();
  //     setJustifyApproverModal('');
  //     setIsLoading(false);
  //     setShowApproverModal(!showApproverModal);
  //   }
  // };

  // const handleApproverModal = () => {
  //   setShowApproverModal(!showApproverModal), setJustifyApproverModal('');
  // };

  const handleModalStatus = (status: string) => setModalStatus(status);

  const handleJustifyApproverModal = (
    event: ChangeEvent<HTMLTextAreaElement>
  ) => setJustifyApproverModal(event.target.value);

  const showApproverButtons =
    user?.role !== 1 &&
    maintenanceContractData?.status === 'waiting for approval';

  return (
    <>
      <Request.Form onSubmitForm={handleSubmit(onSubmitForm)}>
        <Content>
          <div className="flex flex-col gap-4">
            {MaintenanceContractFormInputs.map((data) => (
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
            handleApproverModal={() => {}}
            handleModalStatus={handleModalStatus}
          />
        ) : (
          <Request.GroupButtons isLoading={isLoading} />
        )}
      </Request.Form>
      {showApproverModal && (
        <ApproverModal
          handleJustifyApproverModal={() => {}}
          handleApproverActionOnRequest={async () => {}}
          handleApproverModal={() => {}}
          modalStatus={modalStatus}
          justifyApproverModal={justifyApproverModal}
        />
      )}
    </>
  );
};
