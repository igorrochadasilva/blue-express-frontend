import axios from 'axios'
import { notifyDefaultError, notifyError, notifySuccess } from '../toast/notifications'
import { IRequestBody, TUser } from '../types/global/types'

interface ICreateApproval {
  user: TUser
  statusAction: string
  requestData: IRequestBody | undefined
  justify: string
  url: string
}

export const createApproval = async ({ user, statusAction, requestData, justify, url }: ICreateApproval) => {
  let requestStatus = ''

  switch (statusAction) {
    case 'sketch':
      requestStatus = 'sketch'
      break
    case 'information':
      requestStatus = 'waiting for information'
      break
    case 'disapprove':
      requestStatus = 'disapproved'
      break
    case 'approve':
      requestStatus = 'approved'
      break
    default:
      requestStatus = 'waiting for approval'
  }

  const formatApprovalData = {
    title: `Approval Level ${requestData?.currentLevel}`,
    level: requestData?.currentLevel,
    user: user?.id,
    requestId: requestData?.requestId,
    status: requestStatus,
    justify: justify,
    typeRequest: requestData?.title,
    author: user?.name,
    approver: user?.id,
    maintenanceContract: requestData?.id,
  }

  const formatRequestData = {
    status: requestStatus,
  }

  try {
    await axios.patch(`http://localhost:3001/request/${url}/${requestData?.id}`, formatRequestData)

    const approval = await axios.post('http://localhost:3001/approvals', formatApprovalData, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
    })

    notifySuccess(approval.data.message)
    return true
  } catch (e) {
    const error: any = e
    if (error.response?.data.message) {
      notifyError(error.response.data.message)
      return false
    } else {
      notifyDefaultError()
      return false
    }
  }
}
