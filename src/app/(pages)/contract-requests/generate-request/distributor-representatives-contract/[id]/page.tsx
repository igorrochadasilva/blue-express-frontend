'use client'

import { ChangeEvent, useEffect, useState } from 'react'
import Container from '../../../../../../components/Global/Container/Container'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import { IRequestBody, TUser } from '../../../../../../types/global/types'
import { SubmitHandler } from 'react-hook-form'
import {
  getDistributorRepresentativesContractRequest,
  updateDistributorRepresentativesContractRequest,
} from '../../../../../../actions/distributor-representatives-contract'
import Form from '../../../../../../components/Pages/Request/Form/Form'
import { DRCFormDataInputs } from '../../../../../../libs/DRCFormDataInputs'
import ApproverModal from '../../../../../../components/Global/ApproverModal/ApproverModal'
import { createApproval } from '../../../../../../actions/approvals'
import RequestForm from '../../../../../../components/Global/RequestForm/RequestForm'

export default function DistributorRepresentativeContractRequest() {
  const router = useRouter()
  const { data: session } = useSession()
  const [isLoading, setIsLoading] = useState(false)
  const [requestData, setRequestData] = useState<IRequestBody>()
  const FormDataInputs = DRCFormDataInputs
  //approver modal states
  const [showApproverModal, setShowApproverModal] = useState(false)
  const [modalStatus, setModalStatus] = useState('')
  const [justifyApproverModal, setJustifyApproverModal] = useState('')

  const pathName = usePathname()
  const pathSegments = pathName.split('/')
  const requestId = pathSegments[pathSegments.length - 1]

  const user: TUser = session?.user

  const fetchRequestData = async (id: string) => {
    setIsLoading(true)

    const request = await getDistributorRepresentativesContractRequest(id)

    if (request) {
      setRequestData(request)
      setIsLoading(false)
    }
  }

  const onSubmitForm: SubmitHandler<IRequestBody> = async (data) => {
    setIsLoading(true)
    const res = await updateDistributorRepresentativesContractRequest(data)
    if (res) {
      router.push('/contract-requests')
    }
    setIsLoading(false)
  }

  const handleApproverActionOnRequest = async (statusAction: string) => {
    const data = {
      user: user,
      statusAction: statusAction,
      requestData: requestData,
      justify: justifyApproverModal,
      url: 'distributor-representatives-contract',
    }

    setIsLoading(true)
    const res = await createApproval(data)
    if (res) {
      router.push('/contract-requests')
    } else {
      setJustifyApproverModal('')
      setIsLoading(false)
      setShowApproverModal(!showApproverModal)
    }
  }

  const handleApproverModal = () => {
    setShowApproverModal(!showApproverModal), setJustifyApproverModal('')
  }

  const handleModalStatus = (status: string) => setModalStatus(status)

  const handleJustifyApproverModal = (event: ChangeEvent<HTMLTextAreaElement>) =>
    setJustifyApproverModal(event.target.value)

  useEffect(() => {
    fetchRequestData(requestId)
  }, [])

  if (isLoading) {
    return <Container title="Loading..."></Container>
  }

  return (
    <Container title={requestData?.requestId}>
      <RequestForm
        FormDataInputs={FormDataInputs}
        handleApproverModal={handleApproverModal}
        onSubmitForm={onSubmitForm}
        isLoading={isLoading}
        user={user}
        requestData={requestData}
        handleModalStatus={handleModalStatus}
      />
      {showApproverModal && (
        <ApproverModal
          handleJustifyApproverModal={handleJustifyApproverModal}
          handleApproverActionOnRequest={handleApproverActionOnRequest}
          handleApproverModal={handleApproverModal}
          modalStatus={modalStatus}
          justifyApproverModal={justifyApproverModal}
        />
      )}
    </Container>
  )
}
