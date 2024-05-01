'use client'

import { useSession } from 'next-auth/react'
import { INewApproverData, TUser } from '../../../types/global/types'
import { SubmitHandler, useForm } from 'react-hook-form'
import { createApprover } from '../../../actions/approvers'
import Container from '../../Global/Container/Container'
import FormNewApprover from '.'
import Content from '../../Global/Content/Content'
import { NAFormDataInputs } from '../../../libs/NAFormDataInputs'

const NewApproverContent = () => {
  const { data: session, status } = useSession()
  const user: TUser = session?.user

  const { register, handleSubmit } = useForm<INewApproverData>({
    mode: 'all',
  })

  const onSubmitNewApproverForm: SubmitHandler<INewApproverData> = async (data) => {
    createApprover(data, user?.accessToken)
  }

  return (
    <Container title="New Approver" btnNavigateLink="/approver/new-approver" btnNavigateText="New Approver">
      <FormNewApprover.Form onSubmitForm={handleSubmit(onSubmitNewApproverForm)}>
        <Content>
          <div className="flex flex-col gap-4">
            {NAFormDataInputs.map((data, i) => (
              <FormNewApprover.InputGroup key={i}>
                {data.map((item: any) => {
                  if (item.type === 'input') {
                    return (
                      <FormNewApprover.Input
                        key={item.id}
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
                        key={item.id}
                        inputName={item.inputName}
                        labelText={item.labelText}
                        options={item.options}
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
          <FormNewApprover.Button />
        </Content>
      </FormNewApprover.Form>
    </Container>
  )
}

export default NewApproverContent
