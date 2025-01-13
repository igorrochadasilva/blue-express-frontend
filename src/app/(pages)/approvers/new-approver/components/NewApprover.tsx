'use client';

import { SubmitHandler, useForm } from 'react-hook-form';

import { useMemo, useState } from 'react';
import { v4 as uuid4 } from 'uuid';
import { postApprover } from '@/services/approver/postApprover';
import { Approver, PostApproverDTO } from '@/types/approvers/approvers';
import { notifyMessage } from '@/utils/notifyMessage';
import {
  RequestCompanyEnum,
  RequestOfficeEnum,
  RequestsKeyEnum,
  RequestsTitleEnum,
} from '@/types/requests/enums';
import { UserNames } from '@/types/approvers/newApprover';
import { User } from '@/types/approvers/user';
import { getUserApprovers } from '@/services/user/getUsersById';
import { Content } from '@/components/Content/Content';
import { NewApproverFormInputs } from '@/libs/Forms/NewApproverFormInputs';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ActionButtons } from './ActionButtons';
import { zodResolver } from '@hookform/resolvers/zod';
import { createApproverSchema } from '@/schemas/approver/createApprover';

interface NewApproverProps {
  usersData: User[];
}

export const NewApprover = ({ usersData }: NewApproverProps) => {
  const [userApproversList, setUserApproversList] = useState<Approver[]>([]);

  const methods = useForm<PostApproverDTO>({
    resolver: zodResolver(createApproverSchema),
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

  const handleChangeApproverSelect = async (userId: string) => {
    const response = await getUserApprovers(Number(userId));

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
    <Form {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmitNewApproverForm)}>
        <Content>
          <div className="flex flex-col gap-4">
            {NewApproverFormInputs.map((data) => (
              <div
                className="flex flex-row justify-between gap-4 text-sm"
                key={uuid4()}
              >
                {data.map((item) => {
                  return (
                    <FormField
                      key={item.id}
                      control={methods.control}
                      name={item.inputName}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>{item.inputName}</FormLabel>
                          <FormControl>
                            {item.type === 'select' ? (
                              <Select
                                value={field.value as string}
                                onValueChange={(value) => {
                                  field.onChange(value);
                                  if (item.inputName === 'userId') {
                                    handleChangeApproverSelect(value);
                                  }
                                }}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a period" />
                                </SelectTrigger>
                                <SelectContent>
                                  {(item.inputName === 'userId'
                                    ? usersName.map((user) => ({
                                        value: user.value,
                                        label: user.label,
                                      }))
                                    : item.options
                                  )?.map((option) => (
                                    <SelectItem
                                      key={option.value}
                                      value={option.value}
                                    >
                                      {option.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            ) : (
                              <Input
                                {...field}
                                type={item.inputType}
                                placeholder={item.inputName}
                                id={item.inputName}
                                readOnly={item.readonly}
                              />
                            )}
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </Content>
        <Content>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Request Type</TableHead>
                <TableHead>Approver</TableHead>
                <TableHead>Level</TableHead>
                <TableHead>Competence</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Office</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userApproversList &&
                userApproversList.map((approver: Approver) => {
                  return (
                    <TableRow key={uuid4()}>
                      <TableCell>{approver.title}</TableCell>
                      <TableCell>{approver.approverName}</TableCell>
                      <TableCell>{approver.level}</TableCell>
                      <TableCell>{approver.competence}</TableCell>
                      <TableCell>{approver.company}</TableCell>
                      <TableCell>{approver.office}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </Content>
        <Content>
          <ActionButtons />
        </Content>
      </form>
    </Form>
  );
};
