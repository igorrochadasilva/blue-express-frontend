'use client'

import { IApproverData, INewApproverData, TUser } from '../../../types/global/types'
import { SubmitHandler, useForm } from 'react-hook-form'
import { createApprover } from '../../../actions/approvers'
import FormNewApprover from '.'
import Content from '../../Global/Content/Content'
import { NAFormDataInputs } from '../../../libs/NAFormDataInputs'
import { useEffect, useState } from 'react'
import { v4 as uuid4 } from 'uuid'
import { getUser } from '../../../actions/user'

interface INewApproverContent {
  user: TUser
  usersName: string[]
}

const NewApproverContent = ({ user, usersName }: INewApproverContent) => {
  const [userApproversList, setUserApproversList] = useState<IApproverData[]>([])

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

  useEffect(() => {
    const userSelected = watch('user')
    userSelected && handleChangeApproverSelect(userSelected)
  }, [watch('user')])

  return (
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
                      options={item.inputName === 'user' ? usersName : item.options}
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
  )
}

export default NewApproverContent
