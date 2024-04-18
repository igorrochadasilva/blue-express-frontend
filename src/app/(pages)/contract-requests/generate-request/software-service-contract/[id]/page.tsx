'use client'

import { useEffect, useState } from 'react'
import Container from '../../../../../../components/Global/Container/Container'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import { IRequestBody, TUser } from '../../../../../../types/global/types'
import { SubmitHandler } from 'react-hook-form'
import Form from '../../../../../../components/Pages/SoftwareServiceContract/Form'
import {
  getSoftwareServiceContractRequest,
  updateSoftwareServiceContractRequest,
} from '../../../../../../actions/software-service-contract'

export default function SoftwareServiceContractRequest() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const { data: session } = useSession()
  const pathName = usePathname()
  const pathSegments = pathName.split('/')
  const requestId = pathSegments[pathSegments.length - 1]
  const [requestData, setRequestData] = useState<IRequestBody>()

  const user: TUser = session?.user

  useEffect(() => {
    const fetchData = async (id: string) => {
      setIsLoading(true)

      const request = await getSoftwareServiceContractRequest(id)

      if (request) {
        setRequestData(request)
        setIsLoading(false)
      }
    }

    fetchData(requestId)
  }, [])

  const onSubmitLogin: SubmitHandler<IRequestBody> = async (data) => {
    setIsLoading(true)
    const res = await updateSoftwareServiceContractRequest(data)
    if (res) {
      router.push('/contract-requests')
    }
    setIsLoading(false)
  }

  if (isLoading) {
    return <Container title="Loading..."></Container>
  }

  return (
    <Container title={requestData?.clmHeaderNumber}>
      <Form isLoading={isLoading} onSubmitLogin={onSubmitLogin} requesterName={user?.name} requestData={requestData} />
    </Container>
  )
}
