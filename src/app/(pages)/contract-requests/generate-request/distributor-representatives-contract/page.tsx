'use client'

import { useState } from 'react'
import Container from '../../../../../components/Global/Container/Container'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { TContracts, TUser } from '../../../../../types/global/types'
import { SubmitHandler, useForm } from 'react-hook-form'
import { createDistributorRepresentativesContractsRequest } from '../../../../../actions/distributor-representatives-contract'
import Content from '../../../../../components/Global/Content/Content'
import InputGroup from '../../../../../components/Global/Form/InputGroup'
import InputForm from '../../../../../components/Global/Form/InputForm'
import {
  approverLevelOptions,
  companyOptions,
  contractTypeOptions,
  typeRequestOrderOptions,
  ufOptions,
} from '../../../../../libs/utils'
import GroupButtons from '../../../../../components/Global/GroupButtons/GroupButtons'

export default function DistributorRepresentativeContract() {
  const [isLoading, setIsLoading] = useState(false)
  const { data: session, status } = useSession()
  const router = useRouter()
  const user: TUser = session?.user

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<TContracts>({
    mode: 'all',
  })

  const onSubmitLogin: SubmitHandler<TContracts> = async (data) => {
    setIsLoading(true)
    const res = await createDistributorRepresentativesContractsRequest(data, user)
    if (res) {
      router.push('/contract-requests')
    }
    setIsLoading(false)
  }

  return (
    <Container title="Distributor Representative Contract">
      <form onSubmit={handleSubmit(onSubmitLogin)} action="">
        <Content>
          <div className="flex flex-col gap-4">
            <InputGroup>
              <InputForm
                labelText="Requester"
                inputName="requesterName"
                inputType="text"
                register={register}
                inputValue={user?.name}
                readonly={true}
              />
              <InputForm
                labelText="CLM Number (Header)"
                inputName="clmHeaderNumber"
                inputType="text"
                register={register}
                required
              />
              <InputForm labelText="CLM Number (Line)" inputName="clmLineNumber" inputType="text" register={register} />
            </InputGroup>
            <InputGroup>
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
              <InputForm
                labelText="Start Date/Renewal"
                inputName="renewStartDate"
                inputType="date"
                register={register}
                required
              />
            </InputGroup>
            <InputGroup>
              <InputForm
                labelText="End Date/Renewal"
                inputName="renewEndDate"
                inputType="date"
                register={register}
                required
              />
              <label htmlFor="typeRequestOrder " className="flex flex-col flex-1 mb-2">
                Representative / Distributor
                <select required className="rounded border-[1px] py-1 px-2 mt-2" {...register('typeRequestOrder')}>
                  {typeRequestOrderOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
              <InputForm
                labelText="Name Representative / Distributor"
                inputName="nameRepresentativeDistributor"
                inputType="text"
                register={register}
                required
              />
            </InputGroup>
            <InputGroup>
              <InputForm labelText="Vendor" inputName="vendor" inputType="text" register={register} required />
              <InputForm
                labelText="Commission Percentage"
                inputName="commissionPercentage"
                inputType="number"
                register={register}
              />
              <InputForm labelText="Manager" inputName="manager" inputType="text" register={register} />
            </InputGroup>
            <InputGroup>
              <InputForm labelText="Activity" inputName="activity" inputType="text" register={register} />
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
              <label htmlFor="uploadedFile" className="flex flex-col flex-1 mb-2 ">
                attachments
                <input
                  className="mt-2"
                  type="file"
                  id="fileInput"
                  accept=".pdf,.docx,.xlsx"
                  multiple
                  {...register('uploadedFile')}
                />
              </label>
              <div className="flex-1"></div>
            </InputGroup>
          </div>
        </Content>
        <GroupButtons isLoading={isLoading} />
      </form>
    </Container>
  )
}
