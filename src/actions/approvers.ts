import axios from 'axios'
import { notifyDefaultError, notifyError, notifySuccess } from '../toast/notifications'
import { INewApproverData } from '../types/global/types'
import { generateRequestKey } from '../libs/utils'

export async function listApprovers(token: string | undefined) {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BLUE_EXPRESS_API}/approvers`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return { status: 200, data: res.data, message: 'successful' }
  } catch (e) {
    const error: any = e
    if (error.response?.data.message) {
      return { status: 400, data: null, message: error.response?.data.message }
    } else {
      return { status: 500, data: null, message: 'An error occurred. Please try again later.' }
    }
  }
}

export async function deleteApprover(id: number, token: string | undefined) {
  try {
    const res = await axios.delete(`${process.env.NEXT_PUBLIC_BLUE_EXPRESS_API}/approvers/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (res.data) {
      notifySuccess('Approver deleted successfully')
      return res.data
    } else {
      return false
    }
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

export async function createApprover(data: INewApproverData, token: string | undefined) {
  const formatData: INewApproverData = {
    ...data,
    competence: Number(data.competence),
    level: Number(data.level),
    user: Number(data.user),
    key: generateRequestKey(data.title),
  }

  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_BLUE_EXPRESS_API}/approvers`, formatData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (res.data) {
      notifySuccess('Approver created successfully')
      return res.data
    } else {
      return false
    }
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
