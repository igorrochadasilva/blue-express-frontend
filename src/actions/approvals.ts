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
console.log('🚀 ~ createApproval ~ env.NEXT_PUBLIC_BLUE_EXPRESS_API:', process.env.NEXT_PUBLIC_BLUE_EXPRESS_API)

export const createApproval = async ({ user, statusAction, requestData, justify, url }: ICreateApproval) => {
  const requestStatus = generateRequestStatus(statusAction)

  const formatApprovalData = generateApprovalFormData(user, requestStatus, requestData, justify)

  const formatRequestData = {
    status: requestStatus,
  }

  try {
    await axios.put(
      `${process.env.NEXT_PUBLIC_BLUE_EXPRESS_API}/request/${url}/${requestData?.id}?user=${user?.id}&role=${user?.role}&approver=true`,
      formatRequestData
    )

    const approval = await axios.post('${process.env.NEXT_PUBLIC_BLUE_EXPRESS_API}/approvals', formatApprovalData, {
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
