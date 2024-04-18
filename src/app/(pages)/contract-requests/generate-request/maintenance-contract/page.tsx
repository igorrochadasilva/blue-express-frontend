'use client'

import { useState } from 'react'
import Container from '../../../../../components/Global/Container/Container'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { IRequestBody, TUser } from '../../../../../types/global/types'
import { SubmitHandler } from 'react-hook-form'
import { createMaintenanceContractRequest } from '../../../../../actions/maintenence-contract'
import Form from '../../../../../components/Pages/MaintenanceContract/Form'

export default function MaintenanceContract() {
  const [isLoading, setIsLoading] = useState(false)
  const { data: session, status } = useSession()
  const router = useRouter()
  const user: TUser = session?.user

  const onSubmitLogin: SubmitHandler<IRequestBody> = async (data) => {
    setIsLoading(true)
    const res = await createMaintenanceContractRequest(data, user)
    if (res) {
      router.push('/contract-requests')
    }
    setIsLoading(false)
  }

  return (
    <Container title="Maintenance Contract">
      <Form isLoading={isLoading} onSubmitLogin={onSubmitLogin} user={user} />
    </Container>
  )
}
