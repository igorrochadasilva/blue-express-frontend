import axios from 'axios'
import { notifyDefaultError, notifyError, notifySuccess } from '../toast/notifications'
import { IRequestBody, TUser } from '../types/global/types'
import { generateApprovalFormData, generateRequestStatus } from '../libs/utils'

export interface ICreateApproval {
  user: TUser
  statusAction: string
  requestData: IRequestBody | undefined
  justify: string
  url: string
}

export const createApproval = async ({ user, statusAction, requestData, justify, url }: ICreateApproval) => {
  const requestStatus = generateRequestStatus(statusAction)

  const formatApprovalData = generateApprovalFormData(user, requestStatus, requestData, justify)

  const formatRequestData = {
    status: requestStatus,
  }

  try {
    await axios.patch(
      `http://localhost:3001/request/${url}/${requestData?.id}?user=${user?.id}&role=${user?.role}&approver=true`,
      formatRequestData
    )

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
