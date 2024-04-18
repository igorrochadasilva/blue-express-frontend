'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IRequestBody } from '../../../types/global/types'
import Container from '../../Global/Container/Container'
import Content from '../../Global/Content/Content'
import InputGroup from '../../Global/Inputs/InputGroup'
import InputForm from '../../Global/Inputs/InputForm'
import {
  approverLevelOptions,
  companyOptions,
  companyTypeOptions,
  contractTypeOptions,
  ufOptions,
} from '../../../libs/utils'
import GroupButtons from '../../Global/GroupButtons/GroupButtons'

interface IForm {
  onSubmitLogin: SubmitHandler<IRequestBody>
  isLoading: boolean
  requesterName: string
  requestData?: IRequestBody
}

const Form = ({ onSubmitLogin, isLoading, requesterName, requestData }: IForm) => {
  const { register, watch, handleSubmit } = useForm<IRequestBody>({
    mode: 'all',
    defaultValues: {
      ...requestData,
      contractTotalValue: requestData ? requestData?.contractTotalValue : 0,
      dollarExchangeRate: requestData ? requestData?.dollarExchangeRate : 0,
      totalValueUSD: requestData ? requestData?.totalValueUSD : 0,
    },
  })

  const inputContractTotalValue = watch('contractTotalValue')
  const inputDollarExchangeRate = watch('dollarExchangeRate')
  const inputTotalValueUSD = String(inputContractTotalValue / inputDollarExchangeRate)

  return (
    <form onSubmit={handleSubmit(onSubmitLogin)} action="">
      <Content>
        <div className="flex flex-col gap-4">
          <InputGroup>
            <InputForm
              labelText="Requester"
              inputName="requesterName"
              inputType="text"
              register={register}
              inputValue={requesterName}
              readonly={true}
            />
            <InputForm labelText="Client Name" inputName="clientName" inputType="text" register={register} required />
            <InputForm
              labelText="CLM Number (Header)"
              inputName="clmHeaderNumber"
              inputType="text"
              register={register}
              required
            />
          </InputGroup>
          <InputGroup>
            <InputForm labelText="CLM Number (Line)" inputName="clmLineNumber" inputType="text" register={register} />
            <label className="flex flex-col flex-1 mb-2">
              Contract Type
              <select className="rounded border-[1px] py-1 px-2 mt-2" {...register('typeContract')}>
                {contractTypeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
            <label htmlFor="company" className="flex flex-col flex-1 mb-2">
              Company
              <select
                className="rounded border-[1px] py-1 px-2 mt-2"
                {...register('company', { required: 'This field is required' })}
              >
                {companyOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </InputGroup>
          <InputGroup>
            <InputForm
              labelText="Start Date/Renewal"
              inputName="renewStartDate"
              inputType="date"
              register={register}
              required
            />
            <InputForm
              labelText="End Date/Renewal"
              inputName="renewEndDate"
              inputType="date"
              register={register}
              required
            />
            <label htmlFor="companyType" className="flex flex-col flex-1 mb-2">
              Company Type
              <select required className="rounded border-[1px] py-1 px-2 mt-2" {...register('companyType')}>
                {companyTypeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </InputGroup>
          <InputGroup>
            <InputForm labelText="Scope" inputName="scope" inputType="text" register={register} required />
            <InputForm
              labelText="Payment Condition"
              inputName="paymentCondition"
              inputType="text"
              register={register}
            />
            <InputForm
              labelText="Contract Total Value"
              inputName="contractTotalValue"
              inputType="number"
              register={register}
              required
            />
          </InputGroup>
          <InputGroup>
            <InputForm
              labelText="Dollar Exchange Rate"
              inputName="dollarExchangeRate"
              inputType="number"
              register={register}
              required
            />
            <InputForm
              labelText="Total Value USD"
              inputName="totalValueUSD"
              inputType="number"
              readonly
              inputValue={inputTotalValueUSD}
              register={register}
              required
            />
            <InputForm labelText="GM" inputName="gm" inputType="number" register={register} required />
          </InputGroup>
          <InputGroup>
            <InputForm
              labelText="Inclusion Clauses"
              inputName="inclusionClauses"
              inputType="text"
              register={register}
            />
            <InputForm
              labelText="Inclusion Description"
              inputName="inclusionDescription"
              inputType="text"
              register={register}
            />
            <InputForm
              labelText="legal Indemnification Obligations"
              inputName="legalIndemnificationObligations"
              inputType="text"
              register={register}
            />
          </InputGroup>
          <InputGroup>
            <InputForm
              labelText="legal Warranty Obligations"
              inputName="legalWarrantyObligations"
              inputType="text"
              register={register}
            />
            <InputForm labelText="legal Damage Cap" inputName="legalDamageCap" inputType="text" register={register} />
            <InputForm labelText="Legal Damage Cave" inputName="legalDamageCave" inputType="text" register={register} />
          </InputGroup>
          <InputGroup>
            <InputForm
              labelText="Legal Liquidated Damage"
              inputName="legalLiquidatedDamages"
              inputType="text"
              register={register}
            />
            <InputForm labelText="Justify" inputName="justify" inputType="text" register={register} />
            <InputForm
              labelText="Phone"
              inputName="phone"
              inputType="tel"
              register={register}
              placeholder="(xx) xxxxx-xxxx"
            />
          </InputGroup>
          <InputGroup>
            <InputForm labelText="AntiCorruption" inputName="antiCorruption" inputType="text" register={register} />
            <label htmlFor="frequency" className="flex flex-col flex-1 mb-2">
              UF
              <select
                className="rounded border-[1px] py-1 px-2 mt-2"
                {...register('uf', { required: 'This field is required' })}
              >
                {ufOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
            <InputForm labelText="SAP" inputName="sap" inputType="text" register={register} />
          </InputGroup>
          <InputGroup>
            <InputForm labelText="Contact" inputName="contact" inputType="email" register={register} />
            <label htmlFor="frequency" className="flex flex-col flex-1 mb-2">
              Approval Level
              <select
                className="rounded border-[1px] py-1 px-2 mt-2"
                {...register('approvalLevel', { required: 'This field is required' })}
              >
                {approverLevelOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
            {/* <label htmlFor="uploadedFile" className="flex flex-col flex-1 mb-2 ">
                attachments
                <input
                  className="mt-2"
                  type="file"
                  id="fileInput"
                  accept=".pdf,.docx,.xlsx"
                  multiple
                  {...register('uploadedFile')}
                />
              </label> */}
            <div className="flex-1"></div>
          </InputGroup>
        </div>
      </Content>
      <GroupButtons isLoading={isLoading} />
    </form>
  )
}

export default Form
