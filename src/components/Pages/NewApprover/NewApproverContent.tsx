'use client';

import { SubmitHandler, useForm } from 'react-hook-form';

import FormNewApprover from '.';
import Content from '../../Global/Content/Content';
import { NewApproverFormInputs } from '../../../libs/NewApproverFormInputs';
import { useEffect, useState } from 'react';
import { v4 as uuid4 } from 'uuid';
import { getUser } from '../../../actions/user';
import { postApprover } from '@/actions/approver/postApprover';
import { Approver, PostApproverDTO } from '@/types/approvers/approvers';
import { notifyMessage } from '@/toast/notifications';
import { UserSession } from '@/types/auth/sign';
import {
  RequestCompanyEnum,
  RequestOfficeEnum,
  RequestsKeyEnum,
  RequestsTitleEnum,
} from '@/types/requests/enums';
import { NewApproverFormInput, UserNames } from '@/types/approvers/newApprover';

interface NewApproverContentProps {
  user: UserSession;
  usersName: UserNames[];
}

const NewApproverContent = ({ user, usersName }: NewApproverContentProps) => {
  const [userApproversList, setUserApproversList] = useState<Approver[]>([]);

  const { register, handleSubmit, watch } = useForm<PostApproverDTO>({
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
    const data = await getUser(userId, user?.accessToken, true);

    const { approvers } = data;

    if (approvers) {
      setUserApproversList(approvers);
    }
  };

  useEffect(() => {
    const userSelected = watch('userId');
    userSelected && handleChangeApproverSelect(userSelected);
  }, [watch('userId')]);

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

export default NewApproverContent;
