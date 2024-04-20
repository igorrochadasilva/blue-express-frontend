'use client'

import { SubmitHandler, useForm } from 'react-hook-form'
import { IRequestBody, TUser } from '../../../types/global/types'
import Content from '../../Global/Content/Content'
import InputForm from '../../Global/Inputs/InputForm'
import InputGroup from '../../Global/Inputs/InputGroup'
import GroupButtons from '../../Global/RequesterButtons/RequesterButtons'
import ApproverButtons from '../../Global/ApproverButtons/ApproverButtons'
import SelectForm from '../../Global/Inputs/SelectForm'

interface IForm {
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

const Form = ({
  user,
  isLoading,
  requestData,
  FormDataInputs,
  onSubmitForm,
  handleApproverModal,
  handleModalStatus,
}: IForm) => {
  const { register, watch, handleSubmit, setValue } = useForm<IRequestBody>({
    mode: 'all',
    defaultValues: {
      ...requestData,
      contractTotalValue: requestData ? requestData?.contractTotalValue : 0,
      dollarExchangeRate: requestData ? requestData?.dollarExchangeRate : 0,
      totalValueUSD: requestData ? requestData?.totalValueUSD : 0,
      requesterName: requestData ? requestData?.requesterName : user?.name,
    },
  })

  const showApproverButtons = user?.role !== 1 && requestData?.status === 'waiting for approval'

  const inputContractTotalValue = watch('contractTotalValue')
  const inputDollarExchangeRate = watch('dollarExchangeRate')
  const inputTotalValueUSD = inputContractTotalValue / inputDollarExchangeRate
  setValue('totalValueUSD', inputTotalValueUSD)

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} action="">
      <Content>
        <div className="flex flex-col gap-4">
          {FormDataInputs.map((data, i) => (
            <InputGroup key={i}>
              {data.map((item: any) => {
                if (item.type === 'input') {
                  return (
                    <InputForm
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
                    <SelectForm
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
            </InputGroup>
          ))}
        </div>
      </Content>
      {showApproverButtons ? (
        <ApproverButtons handleApproverModal={handleApproverModal} handleModalStatus={handleModalStatus} />
      ) : (
        <GroupButtons isLoading={isLoading} />
      )}
    </form>
  )
}

export default Form
