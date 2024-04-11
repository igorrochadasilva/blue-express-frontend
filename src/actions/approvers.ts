import axios from 'axios'
import { notifyDefaultError, notifyError, notifySuccess } from '../toast/notifications'

export async function listApprovers(token: string | undefined) {
  try {
    const res = await axios.get('http://localhost:3001/approvers', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (res.data) {
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

export async function deleteApprover(id: number, token: string | undefined) {
  try {
    const res = await axios.delete(`http://localhost:3001/approvers/${id}`, {
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
