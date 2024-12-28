'use client';

import { SubmitHandler, useForm } from 'react-hook-form';

import { useMemo, useState } from 'react';
import { v4 as uuid4 } from 'uuid';
import { postApprover } from '@/actions/approver/postApprover';
import { Approver, PostApproverDTO } from '@/types/approvers/approvers';
import { notifyMessage } from '@/utils/notifyMessage';
import {
  RequestCompanyEnum,
  RequestOfficeEnum,
  RequestsKeyEnum,
  RequestsTitleEnum,
} from '@/types/requests/enums';
import { NewApproverFormInput, UserNames } from '@/types/approvers/newApprover';
import { User } from '@/types/approvers/user';
import { getUserApprovers } from '@/actions/user/getUsersById';
import { Content } from '@/components/Content/Content';
import { NewApproverFormInputs } from '@/libs/Forms/NewApproverFormInputs';
import FormNewApprover from './Form';

interface NewApproverProps {
  usersData: User[];
}

export const NewApprover = ({ usersData }: NewApproverProps) => {
  const [userApproversList, setUserApproversList] = useState<Approver[]>([]);

  const { register, handleSubmit } = useForm<PostApproverDTO>({
    mode: 'all',
    defaultValues: {
      title: RequestsTitleEnum.MAINTENANCE_CONTRACT,
      company: RequestCompanyEnum.PS,
      competence: 0,
      key: RequestsKeyEnum.MAINTENANCE_CONTRACT_KEY,
      level: 0,
      office: RequestOfficeEnum.SUPERVISOR,
      userId: 0,
    },
  });

  const onSubmitNewApproverForm: SubmitHandler<PostApproverDTO> = async (
    data
  ) => {
    const response = await postApprover(data);

    if (response.statusCode === 201)
      return setUserApproversList([
        response.data as Approver,
        ...userApproversList,
      ]);

    notifyMessage({
      message: response.message,
      statusCode: response.statusCode,
    });
  };

  const handleChangeApproverSelect = async (userId: number) => {
    const response = await getUserApprovers(userId);

    if (response.statusCode === 200)
      return setUserApproversList(response?.data?.approvers ?? []);

    notifyMessage({
      message: response?.message,
      statusCode: response.statusCode,
    });
  };

  const usersName: UserNames[] = useMemo(
    () =>
      usersData.map((user) => ({
        value: String(user.id),
        label: user.name,
      })),
    [usersData]
  );

  return (
    <FormNewApprover.Form onSubmitForm={handleSubmit(onSubmitNewApproverForm)}>
      <Content>
        <div className="flex flex-col gap-4">
          {NewApproverFormInputs.map((data) => (
            <FormNewApprover.InputGroup key={uuid4()}>
              {data.map((item: NewApproverFormInput) => {
                if (item.type === 'input') {
                  return (
                    <FormNewApprover.Input
                      key={uuid4()}
                      labelText={item.labelText}
                      inputName={item.inputName}
                      inputType={item.inputType}
                      required={item.required}
                      validation={item.validation}
                      readonly={item.id === 1}
                      register={register}
                    />
                  );
                } else {
                  return (
                    <FormNewApprover.Select
                      key={uuid4()}
                      inputName={item.inputName}
                      labelText={item.labelText}
                      options={
                        item.inputName === 'userId' ? usersName : item.options
                      }
                      validation={item.validation}
                      register={register}
                      required={item.required}
                      handleChangeApproverSelect={
                        item.inputName === 'userId'
                          ? handleChangeApproverSelect
                          : undefined
                      }
                    />
                  );
                }
              })}
            </FormNewApprover.InputGroup>
          ))}
        </div>
      </Content>
      <Content>
        <FormNewApprover.List>
          <FormNewApprover.ListHead />
          <FormNewApprover.ListContent listApprovers={userApproversList} />
        </FormNewApprover.List>
      </Content>
      <Content>
        <FormNewApprover.Button />
      </Content>
    </FormNewApprover.Form>
  );
};
