'use client'

import { useState } from 'react'
import Container from '../../../../../components/Global/Container/Container'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { IRequestBody, TUser } from '../../../../../types/global/types'
import { createSoftwareServiceContractRequest } from '../../../../../actions/software-service-contract'
import { SubmitHandler } from 'react-hook-form'
import Form from '../../../../../components/Pages/Request/Form/Form'
import { SSCFormDataInputs } from '../../../../../libs/SSCFormDataInputs'
import RequestForm from '../../../../../components/Global/RequestForm/RequestForm'

export default function SoftwareServiceContract() {
  const [isLoading, setIsLoading] = useState(false)
  const { data: session, status } = useSession()
  const router = useRouter()
  const user: TUser = session?.user
  const FormDataInputs = SSCFormDataInputs

  const onSubmitForm: SubmitHandler<IRequestBody> = async (data) => {
    setIsLoading(true)
    const res = await createSoftwareServiceContractRequest(data, user)
    if (res) {
      router.push('/contract-requests')
    }
    setIsLoading(false)
  }
  return (
    <Container title="Software Service Contract">
      <RequestForm user={user} isLoading={isLoading} FormDataInputs={FormDataInputs} onSubmitForm={onSubmitForm} />
    </Container>
  )
}
