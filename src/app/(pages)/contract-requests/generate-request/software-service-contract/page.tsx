'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { IRequestBody, TUser } from '../../../../../types/global/types'
import { createSoftwareServiceContractRequest } from '../../../../../actions/software-service-contract'
import Container from '../../../../../components/Global/Container/Container'
import Form from '../../../../../components/Pages/SoftwareServiceContract/Form'

export default function SoftwareServiceContract() {
  const [isLoading, setIsLoading] = useState(false)
  const { data: session, status } = useSession()
  const router = useRouter()
  const user: TUser = session?.user

  const onSubmitLogin: SubmitHandler<IRequestBody> = async (data) => {
    setIsLoading(true)
    const res = await createSoftwareServiceContractRequest(data, user)
    if (res) {
      router.push('/contract-requests')
    }
    setIsLoading(false)
  }
  return (
    <Container title="Software Service Contract">
      <Form isLoading={isLoading} onSubmitLogin={onSubmitLogin} requesterName={user?.name} />
    </Container>
  )
}
