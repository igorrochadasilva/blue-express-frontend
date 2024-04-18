'use client'

import { useEffect, useState } from 'react'
import Container from '../../../../../../components/Global/Container/Container'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import { IRequestBody, TUser } from '../../../../../../types/global/types'
import { SubmitHandler } from 'react-hook-form'
import Form from '../../../../../../components/Pages/DistributorRepresentativeContract/Form'
import {
  getDistributorRepresentativesContractRequest,
  updateDistributorRepresentativesContractRequest,
} from '../../../../../../actions/distributor-representatives-contract'

export default function DistributorRepresentativeContractRequest() {
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

      const request = await getDistributorRepresentativesContractRequest(id)

      if (request) {
        setRequestData(request)
        setIsLoading(false)
      }
    }

    fetchData(requestId)
  }, [])

  const onSubmitLogin: SubmitHandler<IRequestBody> = async (data) => {
    setIsLoading(true)
    const res = await updateDistributorRepresentativesContractRequest(data)
    if (res) {
      router.push('/contract-requests')
    }
    setIsLoading(false)
  }

  if (isLoading) {
    return <Container title="Loading..."></Container>
  }

  return (
    <Container title="Distributor Representative Contract">
      <Form isLoading={isLoading} onSubmitLogin={onSubmitLogin} requestData={requestData} user={user} />
    </Container>
  )
}
