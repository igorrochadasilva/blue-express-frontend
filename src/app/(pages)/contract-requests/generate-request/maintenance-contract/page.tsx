'use client'

import { useState } from 'react'
import Container from '../../../../../components/Global/Container/Container'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { IRequestBody, TUser } from '../../../../../types/global/types'
import { SubmitHandler } from 'react-hook-form'
import { createMaintenanceContractRequest } from '../../../../../actions/maintenence-contract'
import Form from '../../../../../components/Global/Form/Form'
import { MCFormDataInputs } from '../../../../../components/Global/Form/MCFormDataInputs'

export default function MaintenanceContract() {
  const [isLoading, setIsLoading] = useState(false)
  const { data: session, status } = useSession()
  const router = useRouter()
  const user: TUser = session?.user
  const FormDataInputs = MCFormDataInputs

  const onSubmitForm: SubmitHandler<IRequestBody> = async (data) => {
    setIsLoading(true)
    const res = await createMaintenanceContractRequest(data, user)
    if (res) {
      router.push('/contract-requests')
    }
    setIsLoading(false)
  }
  return (
    <Container title="Maintenance Contract">
      <Form user={user} isLoading={isLoading} FormDataInputs={FormDataInputs} onSubmitForm={onSubmitForm} />
    </Container>
  )
}
