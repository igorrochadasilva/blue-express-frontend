'use client'

import { SubmitHandler, useForm } from 'react-hook-form'

import Request from '../../Pages/Request'
import { IRequestBody, TUser } from '../../../types/global/types'
import Content from '../Content/Content'
import { generateDefaultValueUseForm } from '../../../libs/utils'
import { request } from 'https'

interface IRequestForm {
  user: TUser
  isLoading: boolean
  requestData?: IRequestBody
  FormDataInputs: {
    id: number
    type: string
    labelText: string
    inputName: string
    inputType: string
    required: boolean
    options?: any[] | undefined
  }[][]
  onSubmitForm: SubmitHandler<IRequestBody>
  handleApproverModal?: (() => void) | undefined
  handleModalStatus?: ((status: string) => void) | undefined
}

const RequestForm = ({
  user,
  isLoading,
  requestData,
  FormDataInputs,
  onSubmitForm,
  handleApproverModal,
  handleModalStatus,
}: IRequestForm) => {
  const generatedDefaultValues = requestData ? generateDefaultValueUseForm(requestData) : {}

  const { register, watch, handleSubmit, setValue, getValues } = useForm<IRequestBody>({
    mode: 'all',
    defaultValues: {
      ...generatedDefaultValues,
      requesterName: requestData ? requestData?.requesterName : user?.name,
    },
  })

  const showApproverButtons = user?.role !== 1 && requestData?.status === 'waiting for approval'

  const inputContractTotalValue = watch('contractTotalValue')
  const inputDollarExchangeRate = watch('dollarExchangeRate')
  const inputTotalValueUSD = inputContractTotalValue / inputDollarExchangeRate

  if (!requestData?.requestId.includes('DRC')) {
    setValue('totalValueUSD', inputTotalValueUSD)
  }

  return (
    <Request.Form onSubmitForm={handleSubmit(onSubmitForm)}>
      <Content>
        <div className="flex flex-col gap-4">
          {FormDataInputs.map((data, i) => (
            <Request.InputGroup key={i}>
              {data.map((item: any) => {
                if (item.type === 'input') {
                  return (
                    <Request.Input
                      key={item.id}
                      labelText={item.labelText}
                      inputName={item.inputName}
                      inputType={item.inputType}
                      required={item.required}
                      readonly={item.id === 1 ? true : false}
                      register={register}
                      getValues={getValues}
                    />
                  )
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
                  )
                }
              })}
            </Request.InputGroup>
          ))}
        </div>
      </Content>
      {showApproverButtons ? (
        <Request.ApproverButtons handleApproverModal={handleApproverModal} handleModalStatus={handleModalStatus} />
      ) : (
        <Request.GroupButtons isLoading={isLoading} />
      )}
    </Request.Form>
  )
}

export default RequestForm
