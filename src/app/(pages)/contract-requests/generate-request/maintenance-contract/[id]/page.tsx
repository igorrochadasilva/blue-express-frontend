'use client'

import { useEffect, useState } from 'react'
import Container from '../../../../../../components/Global/Container/Container'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'

import { IRequestBody, TUser } from '../../../../../../types/global/types'
import { SubmitHandler } from 'react-hook-form'
import Form from '../../../../../../components/Pages/MaintenanceContract/Form'
import {
  getMaintenanceContractRequest,
  updateMaintenanceContractRequest,
} from '../../../../../../actions/maintenence-contract'
import ApproverModal from '../../../../../../components/Global/ApproverModal/ApproverModal'

export default function MaintenanceContractRequest() {
  const router = useRouter()
  const { data: session } = useSession()
  const [isLoading, setIsLoading] = useState(false)
  const [requestData, setRequestData] = useState<IRequestBody>()

  //approver modal states
  const [showApproverModal, setShowApproverModal] = useState(false)
  const [modalStatus, setModalStatus] = useState('')

  const pathName = usePathname()
  const pathSegments = pathName.split('/')
  const requestId = pathSegments[pathSegments.length - 1]

  const user: TUser = session?.user

  useEffect(() => {
    const fetchData = async (id: string) => {
      setIsLoading(true)

      const request = await getMaintenanceContractRequest(id)

      if (request) {
        setRequestData(request)
        setIsLoading(false)
      }
    }

    fetchData(requestId)
  }, [])

  const onSubmitLogin: SubmitHandler<IRequestBody> = async (data) => {
    setIsLoading(true)
    const res = await updateMaintenanceContractRequest(data)
    if (res) {
      router.push('/contract-requests')
    }
    setIsLoading(false)
  }

  const handleApproverModal = () => setShowApproverModal(!showApproverModal)

  const handleModalStatus = (status: string) => setModalStatus(status)

  if (isLoading) {
    return <Container title="Loading..."></Container>
  }

  return (
    <Container title={requestData?.clmHeaderNumber}>
      <Form
        handleApproverModal={handleApproverModal}
        onSubmitLogin={onSubmitLogin}
        isLoading={isLoading}
        user={user}
        requestData={requestData}
        handleModalStatus={handleModalStatus}
      />
      {showApproverModal && <ApproverModal handleApproverModal={handleApproverModal} modalStatus={modalStatus} />}
    </Container>
  )
}
