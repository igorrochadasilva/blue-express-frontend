'use client'

import { SubmitHandler, useForm } from 'react-hook-form'
import Container from '../../../../components/Global/Container/Container'
import Content from '../../../../components/Global/Content/Content'
import FormNewApprover from '../../../../components/Pages/NewApprover'
import { NAFormDataInputs } from '../../../../libs/NAFormDataInputs'
import { IApproverData, INewApproverData, TUser } from '../../../../types/global/types'
import { createApprover } from '../../../../actions/approvers'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { getUser, listUsers } from '../../../../actions/user'
import { v4 as uuid4 } from 'uuid'

export default function NewApprover() {
  const { data: session, status } = useSession()
  const [userList, setUserList] = useState([])
  const [userApproversList, setUserApproversList] = useState<IApproverData[]>([])
  const user: TUser = session?.user

  const { register, handleSubmit, watch } = useForm<INewApproverData>({
    mode: 'all',
  })

  const onSubmitNewApproverForm: SubmitHandler<INewApproverData> = async (data) => {
    const addedApprover: IApproverData = await createApprover(data, user?.accessToken)
    setUserApproversList([addedApprover, ...userApproversList])
  }

  const handleChangeApproverSelect = async (userId: number) => {
    const data = await getUser(userId, user?.accessToken, true)

    const { approvers } = data

    if (approvers) {
      setUserApproversList(approvers)
    }
  }

  const handleFetchUsers = async () => {
    const users = await listUsers(user?.accessToken)
    const usersName = users.map((user: any) => {
      return { value: user.id, label: user.name }
    })
    setUserList(usersName)
  }

  useEffect(() => {
    status === 'authenticated' && handleFetchUsers()
  }, [status])

  useEffect(() => {
    const userSelected = watch('user')
    userSelected && handleChangeApproverSelect(userSelected)
  }, [watch('user')])

  return (
    <Container title="New Approver" btnNavigateLink="/approver/new-approver" btnNavigateText="New Approver">
      <FormNewApprover.Form onSubmitForm={handleSubmit(onSubmitNewApproverForm)}>
        <Content>
          <div className="flex flex-col gap-4">
            {NAFormDataInputs.map((data) => (
              <FormNewApprover.InputGroup key={uuid4()}>
                {data.map((item: any) => {
                  if (item.type === 'input') {
                    return (
                      <FormNewApprover.Input
                        key={uuid4()}
                        labelText={item.labelText}
                        inputName={item.inputName}
                        inputType={item.inputType}
                        required={item.required}
                        readonly={item.id === 1 ? true : false}
                        register={register}
                      />
                    )
                  } else {
                    return (
                      <FormNewApprover.Select
                        key={uuid4()}
                        inputName={item.inputName}
                        labelText={item.labelText}
                        options={item.inputName === 'user' ? userList : item.options}
                        register={register}
                        required={item.required}
                      />
                    )
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
    </Container>
  )
}
