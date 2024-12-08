'use client';
import { v4 as uuid4 } from 'uuid';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserSession } from '@/types/auth/sign';
import Request from '../../../components/Request';
import Content from '@/components/Global/Content/Content';
import ApproverModal from '@/components/Global/ApproverModal/ApproverModal';
import { notifyMessage } from '@/toast/notifications';
import { isValidApprover } from '@/utils/isValidApprover';
import {
  DistributorRepresentativesContract,
  UpdateDistributorRepresentativesContractDTO,
} from '@/types/requests/distributorRepresentativesContract';
import { putDistributorRepresentativesContractById } from '@/actions/requests/distributor-representatives-contract/putDistributorRepresentativesContractById';
import { DistributorRepresentativesFormInputs } from '@/libs/Forms/DistributionRepresentativesContractFormInputs';

interface DistributorRepresentativesContractIdProps {
  user: UserSession;
  distributorRepresentativesContractData: DistributorRepresentativesContract;
}

export const DistributorRepresentativesContractId = ({
  user,
  distributorRepresentativesContractData,
}: DistributorRepresentativesContractIdProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showApproverModal, setShowApproverModal] = useState(false);
  const [modalStatus, setModalStatus] = useState('');
  const [justifyApproverModal, setJustifyApproverModal] = useState('');

  const { register, handleSubmit, getValues } =
    useForm<UpdateDistributorRepresentativesContractDTO>({
      mode: 'all',
      defaultValues: {
        ...distributorRepresentativesContractData,
        id: distributorRepresentativesContractData.id,
        commissionPercentage: Number(
          distributorRepresentativesContractData.commissionPercentage
        ),
      },
    });

  const onSubmitForm: SubmitHandler<
    UpdateDistributorRepresentativesContractDTO
  > = async (distributorRepresentativesContractDTO) => {
    const response = await putDistributorRepresentativesContractById(
      distributorRepresentativesContractDTO
    );

    notifyMessage({
      message: response?.data?.message ?? response?.message,
      statusCode: response?.statusCode,
    });

    if (response.statusCode === 200) return router.push('/contract-requests');

    setIsLoading(false);
  };

  const handleApproverActionOnRequest = async (statusAction: string) => {
    // const data = {
    //   user: user,
    //   statusAction: statusAction,
    //   requestData: requestData,
    //   justify: justifyApproverModal,
    //   url: requestRouteType,
    // };
    setIsLoading(true);
    // const res = await createApproval(data);
  };

  const handleModalStatus = (status: string) => setModalStatus(status);

  const handleJustifyApproverModal = (
    event: ChangeEvent<HTMLTextAreaElement>
  ) => setJustifyApproverModal(event.target.value);

  const handleShowApproverModal = () => {
    setShowApproverModal(!showApproverModal), setJustifyApproverModal('');
  };

  const showApproverButtons = isValidApprover({
    userName: user.name,
    userRole: user.role,
    contractApproverNames:
      distributorRepresentativesContractData.currentApproverName,
    contractStatus: distributorRepresentativesContractData.status,
  });

  return (
    <>
      <Request.Form onSubmitForm={handleSubmit(onSubmitForm)}>
        <Content>
          <div className="flex flex-col gap-4">
            {DistributorRepresentativesFormInputs.map((data) => (
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
            handleApproverModal={handleShowApproverModal}
            handleModalStatus={handleModalStatus}
          />
        ) : (
          <Request.GroupButtons isLoading={isLoading} />
        )}
      </Request.Form>
      {showApproverModal && (
        <ApproverModal
          handleJustifyApproverModal={handleJustifyApproverModal}
          handleApproverActionOnRequest={handleApproverActionOnRequest}
          handleApproverModal={handleShowApproverModal}
          modalStatus={modalStatus}
          justifyApproverModal={justifyApproverModal}
        />
      )}
    </>
  );
};
